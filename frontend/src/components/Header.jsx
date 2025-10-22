// src/components/Header.jsx
import React from 'react';
import './style/Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import './style/Header.scss'; // 헤더 스타일

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // 로그아웃 후 홈으로 이동
  };

  return (
    <header className="app-header">
      <Link to={user ? "/dashboard" : "/"} className="logo-link">
        <h1>MUSICMEMO 🎵</h1>
      </Link>
      <nav>
        {user ? (
          // 로그인 상태일 때
          <div className="user-info">
            <span>안녕하세요, {user.name}님!</span>
            <button onClick={handleLogout} className="logout-btn">
              로그아웃
            </button>
          </div>
        ) : (
          // 로그아웃 상태일 때
          <div className="guest-info">
            <span>로그인이 필요합니다.</span>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;