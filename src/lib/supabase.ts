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
