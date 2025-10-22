// src/components/ProtectRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectRoute = ({ children }) => {
  const { user } = useAuth(); // AuthContext에서 user 정보를 가져옴

  if (!user) {
    // user 정보가 없으면(로그인 안 했으면) 홈으로 튕겨냄
    return <Navigate to="/" replace />;
  }

  // user 정보가 있으면(로그인 했으면) 자식 컴포넌트(UserDashboard)를 보여줌
  return children; 
};

export default ProtectRoute;