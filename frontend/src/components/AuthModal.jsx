import React, { useState } from 'react'; // 1. React import
import { useNavigate } from 'react-router-dom'; // 2. useNavigate import
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import './style/AuthModal.scss';

const AuthModal = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // 3. isUploading 상태 선언
  const [isUploading, setIsUploading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsUploading(true); // 4. 로딩 시작

    const url = isLoginView ? '/api/auth/login' : '/api/auth/register';
    const payload = isLoginView
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const { data } = await client.post(url, payload);
      login(data);
      navigate('/dashboard', { replace: true });
      // (성공 시엔 페이지가 이동하므로 setIsUploading(false) 불필요)
    } catch (err) {
      setError(err.response?.data?.message || '오류가 발생했습니다.');
      setIsUploading(false); // 5. 에러 시 로딩 끝
    }
  };

  // 6. input 태그들이 모두 포함된 return
  return (
    <div className="auth-modal windows-style">
      <div className="auth-content">
        <p className="auth-title pixel-text">{isLoginView ? '로그인' : '회원가입'}</p>
        <form onSubmit={handleSubmit}>
          {!isLoginView && (
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
              required
              className="windows-input"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
            className="windows-input"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
            className="windows-input"
          />

          <button type="submit" disabled={isUploading} className="windows-button">
            {isUploading ? '처리 중...' : (isLoginView ? '로그인' : '회원가입')}
          </button>
          {error && <p className="error-msg">{error}</p>}
        </form>
        <button
          onClick={() => setIsLoginView(!isLoginView)}
          className="toggle-btn windows-button-toggle"
        >
          {isLoginView ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
        </button>
      </div>
     
    </div>
  );
};

export default AuthModal;