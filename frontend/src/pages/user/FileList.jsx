// frontend/src/pages/user/FileList.jsx
import React, { useState, useEffect } from 'react';
import client from '../../api/client';
import './style/FileList.scss'; // ◀ 스타일 파일 import

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
  }, []);

  // ▼▼▼ [새로 추가된 함수] ▼▼▼
  const handleDelete = async (postId) => {
    // 실수로 삭제하는 것을 막기 위해 확인창 띄우기
    if (!window.confirm('이 기록을 정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      // 1. 백엔드에 삭제 요청 (DELETE /api/posts/ID)
      await client.delete(`/api/posts/${postId}`);
      
      // 2. (성공 시) 프론트엔드 화면에서도 해당 포스트를 즉시 제거
      setPosts(posts.filter((post) => post._id !== postId));

    } catch (err) {
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    }
  };
  // ▲▲▲ [새로 추가된 함수] ▲▲▲

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className="error-msg">{error}</div>;

  return (
    <div className="file-list-container">
      <h4>내 기록 목록</h4>
      {posts.length === 0 ? (
        <p>아직 기록이 없습니다. 새 기록을 추가해보세요!</p>
      ) : (
        <ul className="file-list">
          {posts.map((post) => (
            <li key={post._id} className="post-item">
              <img 
                src={post.albumCoverUrl} 
                alt={post.title} 
                className="album-cover" 
              />
              <div className="post-info">
                <strong>{post.title}</strong>
                <span>{post.artist}</span>
              </div>
              
              {/* ▼▼▼ [새로 추가된 버튼] ▼▼▼ */}
              <button 
                className="delete-btn"
                onClick={() => handleDelete(post._id)}
              >
                X
              </button>
              {/* ▲▲▲ [새로 추가된 버튼] ▲▲▲ */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;