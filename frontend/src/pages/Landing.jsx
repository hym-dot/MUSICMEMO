// src/pages/Landing.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";
import "./style/Landing.scss";

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  if (user) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    // 윈도우 스타일 창 컨테이너
    <div className="windows-container">
      {/* 타이틀 바 */}
      <div className="title-bar">
        <div className="title-bar-text">MUSICMEMO Login</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>

      {/* 창 내용 */}
      <div className="window-body">
        <h2 className="pixel-title">MUSIC MEMO</h2>
        <p className="pixel-text">나의 음악 기록</p>
        <AuthModal />
      </div>
    </div>
  );
};

export default Landing;
