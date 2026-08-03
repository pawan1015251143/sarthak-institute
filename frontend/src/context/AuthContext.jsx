import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_STUDENT } from '../utils/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sarthak_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('sarthak_role') || null;
  });

  const [allStudents, setAllStudents] = useState(() => {
    const saved = localStorage.getItem('sarthak_all_students');
    return saved ? JSON.parse(saved) : [SAMPLE_STUDENT];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sarthak_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sarthak_user');
    }
    if (role) {
      localStorage.setItem('sarthak_role', role);
    } else {
      localStorage.removeItem('sarthak_role');
    }
    localStorage.setItem('sarthak_all_students', JSON.stringify(allStudents));
  }, [user, role, allStudents]);

  const login = async (studentId, password) => {
    // In full deployment, this calls API. With demo fallback:
    const student = allStudents.find(
      (s) => s.studentId.toLowerCase() === studentId.toLowerCase()
    ) || {
      ...SAMPLE_STUDENT,
      studentId: studentId.toUpperCase(),
      name: "Arjun Verma",
    };

    setUser(student);
    setRole('STUDENT');
    return { success: true, user: student };
  };

  const adminLogin = async (email, password) => {
    const adminUser = {
      name: "Rakesh Sir (Admin)",
      email: email,
      role: "ADMIN",
    };
    setUser(adminUser);
    setRole('ADMIN');
    return { success: true, user: adminUser };
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('sarthak_user');
    localStorage.removeItem('sarthak_role');
  };

  const completeFirstLogin = (profileData) => {
    const updatedUser = {
      ...user,
      ...profileData,
      profileLocked: true,
      editRequestStatus: 'NONE',
    };
    setUser(updatedUser);
    setAllStudents((prev) =>
      prev.map((s) => (s.studentId === updatedUser.studentId ? updatedUser : s))
    );
  };

  const requestProfileEdit = () => {
    const updatedUser = {
      ...user,
      editRequestStatus: 'PENDING',
    };
    setUser(updatedUser);
    setAllStudents((prev) =>
      prev.map((s) => (s.studentId === updatedUser.studentId ? updatedUser : s))
    );
  };

  const approveProfileEdit = (studentId) => {
    setAllStudents((prev) =>
      prev.map((s) =>
        s.studentId === studentId
          ? { ...s, editRequestStatus: 'APPROVED', profileLocked: false }
          : s
      )
    );
    if (user && user.studentId === studentId) {
      setUser({ ...user, editRequestStatus: 'APPROVED', profileLocked: false });
    }
  };

  const updateProfileOneTime = (newProfileData) => {
    const updatedUser = {
      ...user,
      ...newProfileData,
      profileLocked: true,
      editRequestStatus: 'NONE',
    };
    setUser(updatedUser);
    setAllStudents((prev) =>
      prev.map((s) => (s.studentId === updatedUser.studentId ? updatedUser : s))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        allStudents,
        login,
        adminLogin,
        logout,
        completeFirstLogin,
        requestProfileEdit,
        approveProfileEdit,
        updateProfileOneTime,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
