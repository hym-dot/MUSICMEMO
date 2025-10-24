// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './style/Header.scss';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <Link to={user ? "/dashboard" : "/"} className="logo-link">
        {/* ▼▼▼ 순서 변경: 로고 텍스트 먼저, 아이콘 나중에 ▼▼▼ */}
        <h1>MUSICMEMO</h1>
        <span className="music-note-icon">🎵</span>
        {/* ▲▲▲ 순서 변경 ▲▲▲ */}
      </Link>
      <nav>
        {user ? (
          <div className="user-info">
            <span>안녕하세요, {user.name}님!</span>
            <button onClick={handleLogout} className="logout-btn">
              로그아웃
            </button>
          </div>
        ) : (
          <div className="guest-info">
            <span>로그인이 필요합니다.</span>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;