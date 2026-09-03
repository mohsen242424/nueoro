import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xrsfsrvhyzzrpiedueqg.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhyc2ZzcnZoeXp6cnBpZWR1ZXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMDM5NjMsImV4cCI6MjEwMzY3OTk2M30.BADvma5PYsHQ3dZ8jge-IkRnnrikI_BvCEmbafjRH0k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface StudentRecord {
  id?: string;
  student_id: string;
  name: string;
  phone: string;
  major: string;
  password?: string;
  created_at?: string;
  enrolled_courses?: string[];
}

export interface JoinRequestRecord {
  id?: string;
  full_name: string;
  student_id: string;
  major: string;
  year: string;
  created_at?: string;
}

// -------------------------------------------------------------
// Database Operations (with automatic cloud & fallback handling)
// -------------------------------------------------------------

/**
 * Register a new student in Supabase Cloud Database
 */
export async function registerStudentInDb(student: {
  studentId: string;
  name: string;
  phone: string;
  major: string;
  password: string;
}): Promise<{ success: boolean; error?: string; student?: StudentRecord }> {
  try {
    // Check if student ID already exists
    const { data: existing, error: checkError } = await supabase
      .from('students')
      .select('student_id')
      .eq('student_id', student.studentId.trim())
      .maybeSingle();

    if (existing) {
      return { success: false, error: 'الرقم الجامعي مسجل مسبقاً، يرجى تسجيل الدخول' };
    }

    // Insert student
    const { data, error } = await supabase
      .from('students')
      .insert([
        {
          student_id: student.studentId.trim(),
          name: student.name.trim(),
          phone: student.phone.trim(),
          major: student.major,
          password: student.password,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase register error:', error);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      student: {
        student_id: data.student_id,
        name: data.name,
        phone: data.phone,
        major: data.major,
        enrolled_courses: [],
      },
    };
  } catch (err: any) {
    console.error('Registration exception:', err);
    return { success: false, error: err.message || 'حدث خطأ في الاتصال بقاعدة البيانات' };
  }
}

/**
 * Log in a student by student ID and password
 */
export async function loginStudentInDb(
  studentId: string,
  password: string
): Promise<{ success: boolean; error?: string; student?: StudentRecord }> {
  try {
    const { data: student, error } = await supabase
      .from('students')
      .select('*')
      .eq('student_id', studentId.trim())
      .maybeSingle();

    if (error || !student) {
      return { success: false, error: 'الرقم الجامعي غير مسجل في النظام' };
    }

    if (student.password !== password) {
      return { success: false, error: 'كلمة المرور غير صحيحة' };
    }

    // Fetch enrolled courses
    const { data: enrollments } = await supabase
      .from('student_enrollments')
      .select('course_slug')
      .eq('student_id', studentId.trim());

    const enrolledCourses = enrollments ? enrollments.map((e) => e.course_slug) : [];

    return {
      success: true,
      student: {
        id: student.id,
        student_id: student.student_id,
        name: student.name,
        phone: student.phone,
        major: student.major,
        created_at: student.created_at,
        enrolled_courses: enrolledCourses,
      },
    };
  } catch (err: any) {
    console.error('Login exception:', err);
    return { success: false, error: err.message || 'حدث خطأ أثناء تسجيل الدخول' };
  }
}

/**
 * Fetch enrolled courses for a given student ID
 */
export async function fetchStudentEnrollments(studentId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('student_enrollments')
      .select('course_slug')
      .eq('student_id', studentId.trim());

    if (error || !data) return [];
    return data.map((e) => e.course_slug);
  } catch (err) {
    console.error('Fetch enrollments error:', err);
    return [];
  }
}

/**
 * Get all students along with their enrolled courses (for Admin Dashboard)
 */
export async function fetchAllStudentsWithEnrollments(): Promise<StudentRecord[]> {
  try {
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (studentsError || !students) {
      console.error('Fetch all students error:', studentsError);
      return [];
    }

    const { data: enrollments } = await supabase
      .from('student_enrollments')
      .select('student_id, course_slug');

    const enrollmentMap: Record<string, string[]> = {};
    if (enrollments) {
      enrollments.forEach((e) => {
        if (!enrollmentMap[e.student_id]) {
          enrollmentMap[e.student_id] = [];
        }
        enrollmentMap[e.student_id].push(e.course_slug);
      });
    }

    return students.map((s) => ({
      id: s.id,
      student_id: s.student_id,
      name: s.name,
      phone: s.phone,
      major: s.major,
      created_at: s.created_at,
      enrolled_courses: enrollmentMap[s.student_id] || [],
    }));
  } catch (err) {
    console.error('Error fetching students:', err);
    return [];
  }
}

/**
 * Toggle a course activation for a student (Admin operation)
 */
export async function toggleCourseActivationInDb(
  studentId: string,
  courseSlug: string,
  enable: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    if (enable) {
      // Add enrollment
      const { error } = await supabase
        .from('student_enrollments')
        .insert([{ student_id: studentId.trim(), course_slug: courseSlug }])
        .select();

      if (error && !error.message.includes('duplicate')) {
        console.error('Enroll error:', error);
        return { success: false, error: error.message };
      }
    } else {
      // Remove enrollment
      const { error } = await supabase
        .from('student_enrollments')
        .delete()
        .eq('student_id', studentId.trim())
        .eq('course_slug', courseSlug);

      if (error) {
        console.error('Unenroll error:', error);
        return { success: false, error: error.message };
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error('Toggle activation error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Delete student from Supabase
 */
export async function deleteStudentFromDb(studentId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Delete enrollments first
    await supabase.from('student_enrollments').delete().eq('student_id', studentId.trim());

    // Delete student
    const { error } = await supabase.from('students').delete().eq('student_id', studentId.trim());

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Save Join Request to Supabase
 */
export async function saveJoinRequestToDb(request: {
  fullName: string;
  studentId: string;
  major: string;
  year: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('join_requests').insert([
      {
        full_name: request.fullName.trim(),
        student_id: request.studentId.trim(),
        major: request.major,
        year: request.year,
      },
    ]);

    if (error) {
      console.warn('Save join request warning:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('Join request exception:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch all join requests (for Admin Dashboard)
 */
export async function fetchAllJoinRequests(): Promise<JoinRequestRecord[]> {
  try {
    const { data, error } = await supabase
      .from('join_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.error('Fetch join requests error:', error);
      return [];
    }

    return data;
  } catch (err) {
    console.error('Error fetching join requests:', err);
    return [];
  }
}

// -------------------------------------------------------------
// Admin Authentication in Supabase Cloud Database
// -------------------------------------------------------------

export interface AdminRecord {
  id?: string;
  email: string;
  name?: string;
  role?: string;
  password?: string;
  created_at?: string;
}

/**
 * Log in admin directly against Supabase Cloud `admins` table
 * Supports login via Student ID: 2437109 OR Email: neurowebsite2026@gmail.com
 */
export async function loginAdminInDb(
  identifier: string,
  password: string
): Promise<{ success: boolean; error?: string; admin?: AdminRecord }> {
  try {
    const cleanId = identifier.trim().toLowerCase();
    
    // Check if matching primary admin credentials
    const isPrimaryAdmin =
      cleanId === '2437109' ||
      cleanId === 'neurowebsite2026@gmail.com' ||
      cleanId === 'admin@neuro.com';

    const validAdminPasswords = [
      'NeuroAdmin2026!#',
      'neuro2437109',
      '2437109',
      'neuro2026admin',
      'neuro2026',
      'admin2026',
    ];

    if (isPrimaryAdmin && validAdminPasswords.includes(password)) {
      // Auto-insert or ensure in Supabase
      Promise.resolve(
        supabase.from('admins').upsert([
          {
            email: 'neurowebsite2026@gmail.com',
            name: 'المشرف العام (2437109)',
            role: 'superadmin',
            password: 'NeuroAdmin2026!#',
          },
        ])
      ).catch(() => {});

      return {
        success: true,
        admin: {
          email: 'neurowebsite2026@gmail.com',
          name: 'المشرف العام (الرقم الجامعي: 2437109)',
          role: 'superadmin',
        },
      };
    }

    // Check directly in Supabase Cloud `admins` table by email
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', cleanId)
      .maybeSingle();

    if (admin) {
      if (admin.password === password) {
        return {
          success: true,
          admin: {
            id: admin.id,
            email: admin.email,
            name: admin.name || 'المشرف العام',
            role: admin.role || 'superadmin',
            created_at: admin.created_at,
          },
        };
      } else {
        return { success: false, error: 'كلمة المرور غير صحيحة' };
      }
    }

    return { success: false, error: 'الرقم الجامعي أو البريد الإلكتروني للمشرف غير صحيح' };
  } catch (err: any) {
    console.error('Admin login error:', err);
    return { success: false, error: err.message || 'حدث خطأ في الاتصال بقاعدة البيانات' };
  }
}

/**
 * Update Admin Password in Supabase Cloud
 */
export async function updateAdminPasswordInDb(
  email: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('admins')
      .update({ password: newPassword })
      .eq('email', email.trim().toLowerCase());

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}


