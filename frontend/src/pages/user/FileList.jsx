// src/pages/user/FileList.jsx
import React, { useState, useEffect } from 'react';
import client from '../../api/client';
import './style/FileList.scss';

const FileList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError('');
      try {
        const { data } = await client.get('/api/posts');
        setPosts(data);
      } catch (err) {
        setError('데이터를 불러오는 데 실패했습니다.');
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []); // key prop이 바뀌면 이 컴포넌트 전체가 재실행(re-mount)됩니다.

  const handleDelete = async (postId) => {
    if (!window.confirm('이 기록을 정말 삭제하시겠습니까?')) {
      return;
    }
    try {
      await client.delete(`/api/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    }
  };

  if (isLoading) return <div className="windows-loading">로딩 중...</div>;
  if (error) return <div className="error-msg">{error}</div>;

  return (
    <div className="file-list-container">
      <h4>내 기록 목록</h4>
      {posts.length === 0 ? (
        <p className="pixel-text">아직 기록이 없습니다. 새 기록을 추가해보세요!</p>
      ) : (
        <ul className="file-list">
          {posts.map((post) => (
            <li key={post._id} className="post-item">
              {/* ▼▼▼ [수정됨] <a> 태그 추가 ▼▼▼ */}
              {post.youtubeUrl ? ( // 유튜브 링크가 있으면 <a> 태그로 감싸기
                <a
                  href={post.youtubeUrl}
                  target="_blank" // 새 탭에서 열기
                  rel="noopener noreferrer" // 보안 설정
                  className="album-link" // 스타일링을 위한 클래스
                >
                  <img
                    src={post.albumCoverUrl}
                    alt={post.title}
                    className="album-cover"
                  />
                </a>
              ) : ( // 유튜브 링크가 없으면 그냥 이미지 표시
                <img
                  src={post.albumCoverUrl}
                  alt={post.title}
                  className="album-cover no-link" // 링크 없음을 나타내는 클래스
                />
              )}
              {/* ▲▲▲ [수정됨] ▲▲▲ */}

              <div className="post-info">
                <strong>{post.title}</strong>
                <span>{post.artist}</span>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(post._id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;