// src/pages/user/UploadForm.jsx
import React, { useState } from 'react';
import './style/UploadForm.scss';
import client from '../../api/client'; // axios client

// 부모(UserDashboard)로부터 onUploadSuccess 함수를 props로 받음
const UploadForm = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [albumCover, setAlbumCover] = useState(null); // 파일 상태
  
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!albumCover) {
      setError('앨범 커버 이미지를 선택해주세요.');
      return;
    }
    
    setIsUploading(true);
    setError('');

    // 파일 업로드는 반드시 FormData 객체를 사용해야 합니다.
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('albumCover', albumCover); // 파일 자체를 추가
    // formData.append('music', musicFile); // 음악 파일도 있다면 추가

    try {
      // client가 자동으로 헤더에 토큰을 추가해줍니다.
      await client.post('/api/posts', formData, {
        // FormData를 보낼 때는 Content-Type을 'multipart/form-data'로 명시
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // 성공 시 폼 초기화
      setTitle('');
      setArtist('');
      setAlbumCover(null);
      e.target.reset(); // 파일 인풋 초기화
      setIsUploading(false);
      
      // 부모 컴포넌트에게 업로드 성공을 알림 (목록 새로고침)
      onUploadSuccess(); 
      
    } catch (err) {
      setError('업로드 실패: ' + (err.response?.data?.message || err.message));
      setIsUploading(false);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <h4>새 음악 기록하기</h4>
      <input 
        type="text" 
        placeholder="곡 제목" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="아티스트" 
        value={artist} 
        onChange={(e) => setArtist(e.target.value)} 
        required 
      />
      <label>
        앨범 커버:
        <input 
          type="file" 
          accept="image/*" // 이미지 파일만
          onChange={(e) => setAlbumCover(e.target.files[0])} 
          required 
        />
      </label>
      <button type="submit" disabled={isUploading}>
        {isUploading ? '업로드 중...' : '기록 추가'}
      </button>
      {error && <p className="error-msg">{error}</p>}
    </form>
  );
};

export default UploadForm;