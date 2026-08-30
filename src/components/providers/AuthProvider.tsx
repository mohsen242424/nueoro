'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  registerStudentInDb,
  loginStudentInDb,
  fetchStudentEnrollments,
  fetchAllStudentsWithEnrollments,
  toggleCourseActivationInDb,
  deleteStudentFromDb,
} from '@/lib/supabase';

export interface User {
  studentId: string;
  name: string;
  phone: string;
  major: string;
  password?: string;
  enrolledCourses: string[]; // array of course slugs e.g. ['anatomy-fundamentals', 'nursing-essentials']
  registeredAt?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  login: (studentId: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: Omit<User, 'enrolledCourses' | 'registeredAt'> & { password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  adminLogin: (pin: string) => boolean;
  adminLogout: () => void;
  isCourseUnlocked: (courseSlug: string) => boolean;
  getAllStudents: () => Promise<User[]>;
  toggleUserCourse: (studentId: string, courseSlug: string) => Promise<boolean>;
  deleteStudent: (studentId: string) => Promise<boolean>;
  refreshCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = 'neuro_active_user';
const ADMIN_SESSION_KEY = 'neuro_admin_auth';
const ADMIN_PIN = 'neuro2026';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Initialize from LocalStorage for immediate UI response
  useEffect(() => {
    setMounted(true);
    try {
      const activeUser = localStorage.getItem(CURRENT_USER_KEY);
      if (activeUser) {
        const userObj: User = JSON.parse(activeUser);
        setCurrentUser(userObj);
        // Refresh enrolled courses in background from Supabase
        fetchStudentEnrollments(userObj.studentId).then((courses) => {
          if (courses && courses.length >= 0) {
            const updated = { ...userObj, enrolledCourses: courses };
            setCurrentUser(updated);
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));
          }
        });
      }

      const adminAuth = localStorage.getItem(ADMIN_SESSION_KEY);
      if (adminAuth === 'true') {
        setIsAdmin(true);
      }
    } catch (e) {
      console.error('Failed to load auth state', e);
    }
  }, []);

  const refreshCurrentUser = async () => {
    if (!currentUser) return;
    try {
      const courses = await fetchStudentEnrollments(currentUser.studentId);
      const updated = { ...currentUser, enrolledCourses: courses };
      setCurrentUser(updated);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to refresh user', err);
    }
  };

  const register = async (
    userData: Omit<User, 'enrolledCourses' | 'registeredAt'> & { password: string }
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // 1. Save to Supabase Cloud Database
      const res = await registerStudentInDb({
        studentId: userData.studentId,
        name: userData.name,
        phone: userData.phone,
        major: userData.major,
        password: userData.password,
      });

      if (!res.success) {
        return { success: false, error: res.error || 'فشل إنشاء الحساب' };
      }

      const newUser: User = {
        studentId: userData.studentId.trim(),
        name: userData.name.trim(),
        phone: userData.phone.trim(),
        major: userData.major,
        enrolledCourses: [],
        registeredAt: new Date().toISOString(),
      };

      setCurrentUser(newUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

      return { success: true };
    } catch (e: any) {
      console.error('Register error:', e);
      return { success: false, error: e.message || 'حدث خطأ غير متوقع' };
    }
  };

  const login = async (
    studentId: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // 1. Attempt login with Supabase Cloud Database
      const res = await loginStudentInDb(studentId, password);

      if (!res.success || !res.student) {
        return { success: false, error: res.error || 'بيانات الدخول غير صحيحة' };
      }

      const user: User = {
        studentId: res.student.student_id,
        name: res.student.name,
        phone: res.student.phone,
        major: res.student.major,
        enrolledCourses: res.student.enrolled_courses || [],
        registeredAt: res.student.created_at,
      };

      setCurrentUser(user);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

      return { success: true };
    } catch (e: any) {
      console.error('Login error:', e);
      return { success: false, error: e.message || 'فشل الاتصال بقاعدة البيانات' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch (e) {}
  };

  const adminLogin = (pin: string): boolean => {
    if (pin === ADMIN_PIN) {
      setIsAdmin(true);
      try {
        localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } catch (e) {}
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (e) {}
  };

  const isCourseUnlocked = (courseSlug: string): boolean => {
    if (isAdmin) return true; // Admin has master access
    if (!currentUser) return false;
    return currentUser.enrolledCourses.includes(courseSlug);
  };

  const getAllStudents = async (): Promise<User[]> => {
    try {
      const records = await fetchAllStudentsWithEnrollments();
      return records.map((r) => ({
        studentId: r.student_id,
        name: r.name,
        phone: r.phone,
        major: r.major,
        enrolledCourses: r.enrolled_courses || [],
        registeredAt: r.created_at || '',
      }));
    } catch (err) {
      console.error('Get all students error:', err);
      return [];
    }
  };

  const toggleUserCourse = async (studentId: string, courseSlug: string): Promise<boolean> => {
    try {
      // Check current state from Supabase
      const currentCourses = await fetchStudentEnrollments(studentId);
      const isEnrolled = currentCourses.includes(courseSlug);

      const res = await toggleCourseActivationInDb(studentId, courseSlug, !isEnrolled);

      if (res.success) {
        // If the student is the currently logged in user on this device, update state
        if (currentUser && currentUser.studentId === studentId) {
          const updatedCourses = !isEnrolled
            ? [...currentUser.enrolledCourses, courseSlug]
            : currentUser.enrolledCourses.filter((s) => s !== courseSlug);
          const updatedUser = { ...currentUser, enrolledCourses: updatedCourses };
          setCurrentUser(updatedUser);
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error('Toggle error:', err);
      return false;
    }
  };

  const deleteStudent = async (studentId: string): Promise<boolean> => {
    try {
      const res = await deleteStudentFromDb(studentId);
      if (res.success) {
        if (currentUser && currentUser.studentId === studentId) {
          logout();
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error('Delete student error:', err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        login,
        register,
        logout,
        adminLogin,
        adminLogout,
        isCourseUnlocked,
        getAllStudents,
        toggleUserCourse,
        deleteStudent,
        refreshCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
