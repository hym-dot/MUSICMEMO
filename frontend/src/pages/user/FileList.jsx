// frontend/src/pages/user/FileList.jsx
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
        // ▼▼▼ 로그 1: 백엔드에서 받은 데이터 확인 ▼▼▼
        console.log("=== [FileList] 백엔드로부터 받은 데이터:", data);
        // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
        setPosts(data);
      } catch (err) {
        setError('데이터를 불러오는 데 실패했습니다.');
        console.error("데이터 로딩 오류:", err); // 에러 로그 추가
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []); // key prop이 바뀌면 이 컴포넌트 전체가 재실행됩니다.

  const handleDelete = async (postId) => {
    // ... (삭제 함수는 동일) ...
    if (!window.confirm('이 기록을 정말 삭제하시겠습니까?')) return;
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
        <p className="pixel-text">아직 기록이 없습니다.</p>
      ) : (
        <ul className="file-list">
          {posts.map((post) => { // <<< 맵 함수 시작 시 중괄호 추가
            // ▼▼▼ 로그 2: 각 앨범 렌더링 직전 데이터 확인 ▼▼▼
            console.log(`[FileList] 앨범 "${post.title}" 렌더링 중... youtubeUrl 값:`, post.youtubeUrl, "존재 여부:", !!post.youtubeUrl);
            // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

            return ( // <<< return 구문 추가
              <li key={post._id} className="post-item">
                {post.youtubeUrl ? ( // youtubeUrl 값으로 링크 생성 여부 결정
                  <a href={post.youtubeUrl} target="_blank" rel="noopener noreferrer" className="album-link">
                    <img src={post.albumCoverUrl} alt={post.title} className="album-cover"/>
                  </a>
                ) : (
                  <img src={post.albumCoverUrl} alt={post.title} className="album-cover no-link"/>
                )}
                <div className="post-info">
                  <strong>{post.title}</strong>
                  <span>{post.artist}</span>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(post._id)}>X</button>
              </li>
            ); // <<< return 구문 추가
          })} {/* <<< 맵 함수 끝 중괄호 추가 */}
        </ul>
      )}
    </div>
  );
};

export default FileList;