// src/pages/user/UploadForm.jsx
import React, { useState } from 'react';
import client from '../../api/client';
import './style/UploadForm.scss';

const UploadForm = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [albumCover, setAlbumCover] = useState(null); // 파일 상태 유지

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  // 파일 선택 시 호출될 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAlbumCover(file || null); // 파일이 없으면 null로 설정
  };


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
    if (albumCover) {
      formData.append('albumCover', albumCover);
    }

    try {
      await client.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 폼 초기화
      setTitle('');
      setArtist('');
      setAlbumCover(null); // 파일 상태도 초기화
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

        <div className="file-input-group">
          <label className="windows-button file-label">
            앨범 커버 선택
            <input
              type="file"
              name="albumCover"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {/* ▼▼▼ 메시지 내용 수정됨 ▼▼▼ */}
        <p className="selected-file-feedback">
          {albumCover ? `앨범 커버 추가 완료: ${albumCover.name}` : '앨범 커버 파일을 선택하세요.'}
        </p>
        {/* ▲▲▲ 메시지 내용 수정됨 ▲▲▲ */}


        <button type="submit" disabled={isUploading} className="windows-button primary">
          {isUploading ? '기록 추가 중...' : '기록 추가'}
        </button>

        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default UploadForm;