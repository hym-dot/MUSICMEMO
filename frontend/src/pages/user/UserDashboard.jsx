// src/pages/user/UserDashboard.jsx
import React, { useState } from 'react';
import UploadForm from './UploadForm';
import FileList from './FileList';
import './style/UserDashboard.scss';

const UserDashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    console.log('업로드 성공! 목록을 새로고침합니다.');
    setRefreshKey(oldKey => oldKey + 1);
  };

  return (
    <div className="windows-container dashboard-window">
      <div className="title-bar">
        <div className="title-bar-text">MUSICMEMO Dashboard</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>

      <div className="window-body dashboard-body">
        <h2 className="dashboard-title pixel-text">나의 음악 기록</h2>
        
        {/* ▼▼▼ [수정됨] 가로 배치를 위한 래퍼 추가 ▼▼▼ */}
        <div className="dashboard-content-horizontal">
          
          <div className="upload-form-wrapper">
            <UploadForm onUploadSuccess={handleUploadSuccess} />
          </div>
          
          <div className="file-list-wrapper">
            <FileList key={refreshKey} />
          </div>

        </div>
        {/* ▲▲▲ [수정됨] ▲▲▲ */}
        
      </div>
    </div>
  );
};

export default UserDashboard;