// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 앱이 처음 로드될 때 localStorage를 확인하여 로그인 상태 복원
    const storedUser = localStorage.getItem("musicmemo_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 로그인 시 호출될 함수
  const login = (userData) => {
    // 사용자 정보를 localStorage에 저장
    localStorage.setItem("musicmemo_user", JSON.stringify(userData));
    setUser(userData);
  };

  // 로그아웃 시 호출될 함수
  const logout = () => {
    localStorage.removeItem("musicmemo_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 다른 컴포넌트에서 쉽게 user, login, logout을 쓸 수 있게 해주는 커스텀 훅
export const useAuth = () => useContext(AuthContext);
