'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  studentId: string;
  name: string;
  phone: string;
  major: string;
  password?: string;
  enrolledCourses: string[]; // array of course slugs e.g. ['anatomy-fundamentals', 'nursing-essentials']
  registeredAt: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  login: (studentId: string, password: string) => { success: boolean; error?: string };
  register: (userData: Omit<User, 'enrolledCourses' | 'registeredAt'> & { password: string }) => { success: boolean; error?: string };
  logout: () => void;
  adminLogin: (pin: string) => boolean;
  adminLogout: () => void;
  isCourseUnlocked: (courseSlug: string) => boolean;
  getAllStudents: () => User[];
  toggleUserCourse: (studentId: string, courseSlug: string) => boolean;
  deleteStudent: (studentId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'neuro_users_db';
const CURRENT_USER_KEY = 'neuro_active_user';
const ADMIN_SESSION_KEY = 'neuro_admin_auth';
const ADMIN_PIN = 'neuro2026';

// Default initial demo students for realistic dashboard testing
const INITIAL_STUDENTS: User[] = [
  {
    studentId: '2134567',
    name: 'أحمد خالد الزعبي',
    phone: '0791234567',
    major: 'العلوم الطبية المخبرية',
    password: 'password123',
    enrolledCourses: ['anatomy-fundamentals', 'physiology-crash-course'],
    registeredAt: '2026-08-01',
  },
  {
    studentId: '2039812',
    name: 'سارة محمد العمري',
    phone: '0789876543',
    major: 'العلاج الطبيعي',
    password: 'password123',
    enrolledCourses: ['anatomy-fundamentals'],
    registeredAt: '2026-08-05',
  },
  {
    studentId: '2210455',
    name: 'عمر ياسين القضاة',
    phone: '0775551234',
    major: 'التصوير الطبي',
    password: 'password123',
    enrolledCourses: [],
    registeredAt: '2026-08-10',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Initialize from LocalStorage
  useEffect(() => {
    setMounted(true);
    try {
      // Ensure database exists
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (!storedUsers) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
      }

      // Check logged in user
      const activeUser = localStorage.getItem(CURRENT_USER_KEY);
      if (activeUser) {
        setCurrentUser(JSON.parse(activeUser));
      }

      // Check admin status
      const adminAuth = localStorage.getItem(ADMIN_SESSION_KEY);
      if (adminAuth === 'true') {
        setIsAdmin(true);
      }
    } catch (e) {
      console.error('Failed to load auth state', e);
    }
  }, []);

  const getStoredUsers = (): User[] => {
    if (typeof window === 'undefined') return INITIAL_STUDENTS;
    try {
      const data = localStorage.getItem(USERS_STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_STUDENTS;
    } catch (e) {
      return INITIAL_STUDENTS;
    }
  };

  const saveUsers = (users: User[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  // Register student
  const register = (userData: Omit<User, 'enrolledCourses' | 'registeredAt'> & { password: string }) => {
    const cleanStudentId = userData.studentId.trim();
    if (!cleanStudentId) {
      return { success: false, error: 'الرجاء إدخال الرقم الجامعي' };
    }
    if (!userData.password || userData.password.length < 6) {
      return { success: false, error: 'كلمة السر يجب أن تكون 6 خانات على الأقل' };
    }

    const users = getStoredUsers();
    const existing = users.find(u => u.studentId === cleanStudentId);
    if (existing) {
      return { success: false, error: 'هذا الرقم الجامعي مسجل مسبقاً! يمكنك تسجيل الدخول.' };
    }

    const newUser: User = {
      ...userData,
      studentId: cleanStudentId,
      enrolledCourses: [],
      registeredAt: new Date().toISOString().split('T')[0],
    };

    const updated = [newUser, ...users];
    saveUsers(updated);
    setCurrentUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return { success: true };
  };

  // Login student
  const login = (studentId: string, password: string) => {
    const cleanId = studentId.trim();
    const users = getStoredUsers();
    const user = users.find(u => u.studentId === cleanId && u.password === password);

    if (!user) {
      return { success: false, error: 'الرقم الجامعي أو كلمة المرور غير صحيحة.' };
    }

    setCurrentUser(user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { success: true };
  };

  // Logout student
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  // Admin login
  const adminLogin = (pin: string) => {
    if (pin.trim() === ADMIN_PIN) {
      setIsAdmin(true);
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem(ADMIN_SESSION_KEY);
  };

  // Check if a course is unlocked for current logged-in user (or admin)
  const isCourseUnlocked = (courseSlug: string): boolean => {
    if (isAdmin) return true; // Admins have master access
    if (!currentUser) return false;
    
    // Check fresh DB in case admin updated it in another tab or just now
    const users = getStoredUsers();
    const freshUser = users.find(u => u.studentId === currentUser.studentId);
    if (freshUser) {
      return freshUser.enrolledCourses?.includes(courseSlug) || false;
    }
    return currentUser.enrolledCourses?.includes(courseSlug) || false;
  };

  // Admin: Get all students
  const getAllStudents = (): User[] => {
    return getStoredUsers();
  };

  // Admin: Toggle course activation for a specific student ID
  const toggleUserCourse = (studentId: string, courseSlug: string): boolean => {
    const users = getStoredUsers();
    const userIndex = users.findIndex(u => u.studentId === studentId);
    if (userIndex === -1) return false;

    const user = users[userIndex];
    const isEnrolled = user.enrolledCourses?.includes(courseSlug);

    let updatedCourses: string[];
    if (isEnrolled) {
      updatedCourses = user.enrolledCourses.filter(slug => slug !== courseSlug);
    } else {
      updatedCourses = [...(user.enrolledCourses || []), courseSlug];
    }

    const updatedUser = { ...user, enrolledCourses: updatedCourses };
    users[userIndex] = updatedUser;
    saveUsers(users);

    // If current logged-in user is this student, update state
    if (currentUser && currentUser.studentId === studentId) {
      setCurrentUser(updatedUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }

    return !isEnrolled;
  };

  // Admin: Delete student
  const deleteStudent = (studentId: string): boolean => {
    const users = getStoredUsers();
    const updated = users.filter(u => u.studentId !== studentId);
    saveUsers(updated);
    if (currentUser && currentUser.studentId === studentId) {
      logout();
    }
    return true;
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
