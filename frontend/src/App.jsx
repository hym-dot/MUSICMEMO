// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import UserDashboard from './pages/user/UserDashboard';
import ProtectRoute from './components/ProtectRoute';

function App() {
  return (
    <div className="App">
      {/* 헤더는 모든 페이지에서 공통으로 보여줌 */}
      <Header />
      
      <main>
        <Routes>
          {/* 공개 경로 */}
          <Route path="/" element={<Landing />} />

          {/* 비공개 경로 (로그인해야 접근 가능) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectRoute>
                <UserDashboard />
              </ProtectRoute>
            } 
          />
          
          {/* 다른 경로로 접근 시 홈으로 이동 */}
          <Route path="*" element={<Landing />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;