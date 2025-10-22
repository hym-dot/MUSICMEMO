// src/pages/user/UserDashboard.jsx
import React,{ useState } from "react";
import "./style/UserDashboard.scss";
import UploadForm from "./UploadForm"; // 파일 업로드 폼
import FileList from "./FileList"; // 파일 목록
// import './style/UserDashboard.scss';

const UserDashboard = () => {
  // FileList를 새로고침하기 위한 '트리거' 상태입니다.
  const [refreshKey, setRefreshKey] = useState(0);

  // UploadForm이 성공적으로 업로드되었을 때 호출될 함수
  const handleUploadSuccess = () => {
    console.log("업로드 성공! 목록을 새로고침합니다.");
    // refreshKey 값을 1 증가시켜 FileList 컴포넌트를 강제로 리렌더링(새로고침)합니다.
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <div className="user-dashboard">
      <h2>나의 음악 기록</h2>

      {/* 1. 업로드 폼 */}
      <UploadForm onUploadSuccess={handleUploadSuccess} />

      <hr />

      {/* 2. 기록 목록 (key prop에 refreshKey를 전달) */}
      <FileList key={refreshKey} />
    </div>
  );
};

export default UserDashboard;
