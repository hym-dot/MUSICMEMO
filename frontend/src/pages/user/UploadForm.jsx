// src/pages/user/UploadForm.jsx
import React, { useState } from 'react';
import client from '../../api/client';
import './style/UploadForm.scss';

const UploadForm = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  // ▼▼▼ [수정됨] memo 상태 삭제 ▼▼▼
  const [albumCover, setAlbumCover] = useState(null);
  // ▼▼▼ [수정됨] musicFile 상태 삭제 ▼▼▼
  
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError('곡 제목을 입력해주세요.');
      return;
    }
    
    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    // ▼▼▼ [수정됨] memo 로직 삭제 ▼▼▼
    if (albumCover) {
      // ▼▼▼ [수정됨] 'albumCover' 이름으로 전송 ▼▼▼
      formData.append('albumCover', albumCover);
    }
    // ▼▼▼ [수정됨] musicFile 로직 삭제 ▼▼▼

    try {
      await client.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setTitle('');
      setArtist('');
      // ▼▼▼ [수정됨] memo 초기화 삭제 ▼▼▼
      setAlbumCover(null);
      // ▼▼▼ [수정됨] musicFile 초기화 삭제 ▼▼▼
      e.target.reset();
      
      onUploadSuccess(); 

    } catch (err) {
      setError(err.response?.data?.message || '기록 추가에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-form">
      <h4>새 음악 기록하기</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="곡 제목 (필수)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="windows-input"
        />
        <input
          type="text"
          name="artist"
          placeholder="아티스트"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="windows-input"
        />
        {/* ▼▼▼ [수정됨] memo <textarea> 삭제 ▼▼▼ */}
        
        <div className="file-input-group">
          <label className="windows-button file-label">
            앨범 커버 선택
            <input
              type="file"
              name="albumCover"
              accept="image/*"
              // ▼▼▼ [수정됨] file state 변경 ▼▼▼
              onChange={(e) => setAlbumCover(e.target.files[0])}
              style={{ display: 'none' }}
            />
          </label>
          <span className="selected-file-name">
            {albumCover ? albumCover.name : '선택된 파일 없음'}
          </span>
        </div>

        {/* ▼▼▼ [수정됨] "음악 파일 선택" div 삭제 ▼▼▼ */}
        
        <button type="submit" disabled={isUploading} className="windows-button primary">
          {isUploading ? '기록 추가 중...' : '기록 추가'}
        </button>

        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default UploadForm;