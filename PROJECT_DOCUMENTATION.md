# 📋 1. 담당 역할 및 범위

**프로젝트**: **MUSICMEMO (음악 메모 관리 시스템)**

**서비스 설명**

- 개인 음악 라이브러리를 기록하고 관리하는 웹 애플리케이션
- 음악 제목과 아티스트를 입력하면 YouTube에서 자동으로 해당 곡을 검색하여 연결
- 앨범 커버 이미지 업로드 및 AWS S3 저장
- 사용자별 음악 컬렉션 관리

**개발 기간**: 2025.08.19 ~ 2025.08.26

**기술 스택**: MongoDB, Express, React 18, Node.js, Vite, JavaScript (ES6+), Mongoose, AWS S3, JWT, bcrypt, Sass, npm, nodemon, dotenv, Git

---

## 🛠️ 주 기술 스택

```
🗂️ MUSICMEMO/
│
├── 📄 README.md                    # 프로젝트 소개
│
├── 🔧 backend/                     # Node.js 백엔드
│   ├── 🚀 server.js               # Express 서버 진입점
│   ├── 🔐 .env                    # 환경변수
│   ├── 📦 package.json            # 의존성 및 스크립트
│   │
│   ├── 📁 config/
│   │   └── 🗄️ db.js              # MongoDB 연결 설정
│   │
│   ├── 📁 controllers/
│   │   ├── 👤 authController.js   # 회원가입/로그인 로직
│   │   └── 📝 postController.js   # 음악 CRUD + YouTube 검색
│   │
│   ├── 📁 middlewares/
│   │   └── 🔐 auth.js             # JWT 인증 미들웨어
│   │
│   ├── 📁 models/
│   │   ├── 👤 User.js             # 사용자 스키마
│   │   └── 📝 Post.js             # 음악 게시물 스키마
│   │
│   ├── 📁 routes/
│   │   ├── 🔑 authRoutes.js       # 인증 API 라우트
│   │   └── 📋 postRoutes.js       # 게시물 API 라우트
│   │
│   └── 📁 src/
│       └── 📤 upload.js           # AWS S3 Multer 설정
│
└── 🎨 frontend/                    # React 프론트엔드
    ├── 📄 index.html              # HTML 진입점
    ├── 📦 package.json            # 의존성 및 스크립트
    │
    ├── 📁 public/
    │   └── 🖼️ cd.png              # 회전 CD 이미지
    │
    └── 📁 src/
        ├── ⚛️ App.jsx              # 루트 컴포넌트 (라우팅)
        ├── 🎨 App.scss             # 전역 스타일
        ├── 🚪 main.jsx             # React 진입점
        ├── 🎨 index.scss           # 전역 스타일
        │
        ├── 📁 api/
        │   └── 🌐 client.js        # Axios 인스턴스
        │
        ├── 📁 components/
        │   ├── 🔐 AuthModal.jsx    # 로그인/회원가입 모달
        │   ├── 🎯 Header.jsx        # 헤더 (로그인/로그아웃 버튼)
        │   └── 🛡️ ProtectRoute.jsx  # 보호된 라우트 HOC
        │
        ├── 📁 context/
        │   └── 🔐 AuthContext.jsx   # 전역 인증 상태 관리
        │
        └── 📁 pages/
            ├── 🏠 Landing.jsx       # 랜딩 페이지
            └── 📁 user/
                ├── 📊 UserDashboard.jsx   # 사용자 대시보드
                ├── 📤 UploadForm.jsx      # 음악 업로드 폼
                └── 📋 FileList.jsx        # 음악 목록
```

**Frontend**

- ⚛️ React 18.3.1
- ⚡ Vite 5.3.5
- 🎨 Sass (SCSS)
- 🌐 React Router DOM 6.25.1
- 📡 Axios 1.7.2

**Backend**

- 🟢 Node.js
- 🚂 Express 5.1.0
- 🍃 MongoDB + Mongoose 8.19.1
- 🔐 JWT + bcrypt
- ☁️ AWS S3 (이미지 저장)
- 🎥 YouTube-sr 4.3.12 (YouTube 검색)
- 📤 Multer + Multer-S3 (파일 업로드)

---

## 💡 2. 기여한 부분

## 1️⃣ **JWT 기반 사용자 인증 시스템**

> 💡 핵심 기술: JWT, bcrypt, React Context API, localStorage
> 

### 🎯 **도입 배경**

사용자마다 자신만의 음악 컬렉션을 관리할 수 있도록 안전한 회원가입/로그인 시스템이 필요했습니다. 비밀번호는 암호화하여 저장하고, 로그인 상태는 토큰 기반으로 관리해야 했습니다.

### ✅ **구현 내용**

**🔐 백엔드 인증 로직 (authController.js)**

- **회원가입 (registerUser)**
    - 이메일 중복 검사
    - bcrypt로 비밀번호 암호화 (10 salt rounds)
    - JWT 토큰 생성 (30일 만료)
    - 사용자 정보와 토큰 반환
- **로그인 (loginUser)**
    - 이메일로 사용자 찾기
    - bcrypt.compare()로 비밀번호 검증
    - 성공 시 JWT 토큰 발급

```javascript
// JWT 생성 헬퍼 함수
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
```

**🛡️ JWT 인증 미들웨어 (auth.js)**

- Authorization 헤더에서 토큰 추출
- jwt.verify()로 토큰 유효성 검증
- 검증된 사용자 정보를 `req.user`에 저장
- 보호된 라우트에서 활용

**🌐 프론트엔드 인증 관리 (AuthContext.jsx)**

- React Context API로 전역 상태 관리
- `user`, `login`, `logout` 함수 제공
- localStorage에 사용자 정보 저장하여 새로고침 시에도 로그인 유지
- useAuth() 커스텀 훅으로 간편한 접근

```javascript
const login = (userData) => {
  localStorage.setItem("musicmemo_user", JSON.stringify(userData));
  setUser(userData);
};
```

**🔒 보호된 라우트 (ProtectRoute.jsx)**

- 로그인하지 않은 사용자는 대시보드 접근 불가
- 자동으로 랜딩 페이지로 리다이렉트
- 로그인 유도

![image](https://via.placeholder.com/800x400.png?text=Login+Modal+Screenshot)

→ 로그인/회원가입 모달

---

## 2️⃣ **YouTube 자동 검색 및 연동 기능**

> 💡 핵심 기술: youtube-sr 라이브러리, 비동기 처리, RESTful API
> 

### 🎯 **도입 배경**

사용자가 음악 제목만 입력하면 해당 곡의 YouTube 링크를 자동으로 찾아서 연결하는 기능이 필요했습니다. 수동으로 링크를 찾는 번거로움을 없애고 사용자 경험을 개선하기 위함입니다.

### ✅ **구현 내용**

**🎥 백엔드 YouTube 검색 로직 (postController.js)**

```javascript
// 1. 검색어 생성 (곡 제목 + 아티스트)
const query = `${title} ${artist || ''}`;

// 2. youtube-sr로 비디오 1개 검색
const video = await Youtube.searchOne(query, "video");

// 3. 검색 결과가 있으면 URL 저장
if (video) {
  foundYoutubeUrl = video.url;
  console.log(`[YouTube 검색 성공] ${query} -> ${foundYoutubeUrl}`);
}
```

**📋 Post 스키마에 youtubeUrl 필드 추가 (Post.js)**

```javascript
youtubeUrl: {
  type: String,
  default: '',
}
```

**🔗 프론트엔드 링크 렌더링 (FileList.jsx)**

- youtubeUrl이 있으면 앨범 커버를 클릭 시 YouTube로 이동
- youtubeUrl이 없으면 일반 이미지로 표시

```jsx
{post.youtubeUrl ? (
  <a href={post.youtubeUrl} target="_blank" rel="noopener noreferrer" className="album-link">
    <img src={post.albumCoverUrl} alt={post.title} className="album-cover"/>
  </a>
) : (
  <img src={post.albumCoverUrl} alt={post.title} className="album-cover no-link"/>
)}
```

**📊 효과**

- ✅ 사용자가 YouTube 링크를 직접 찾을 필요 없음
- ✅ 곡 제목만 입력하면 자동으로 연결
- ✅ 클릭 한 번으로 YouTube에서 곡 감상 가능
- ✅ 검색 실패 시에도 앨범 정보는 정상 저장

![image](https://via.placeholder.com/800x400.png?text=YouTube+Auto+Search+Feature)

→ YouTube 자동 검색 및 링크 연결

---

## 3️⃣ **AWS S3 기반 이미지 업로드**

> 💡 핵심 기술: AWS S3, Multer, Multer-S3, FormData
> 

### 🎯 **도입 배경**

앨범 커버 이미지를 서버에 직접 저장하면 서버 용량 문제가 발생할 수 있습니다. AWS S3를 활용하여 확장 가능하고 안정적인 이미지 저장소를 구축해야 했습니다.

### ✅ **구현 내용**

**☁️ S3 업로드 설정 (upload.js)**

- AWS SDK로 S3 클라이언트 생성
- Multer-S3로 파일 업로드 미들웨어 구성
- 버킷 이름, 리전, 접근 권한 설정
- 고유한 파일명 생성 (Date.now() + 원본 파일명)

```javascript
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  })
});
```

**📤 프론트엔드 파일 업로드 (UploadForm.jsx)**

- FormData 객체로 multipart/form-data 전송
- title, artist, albumCover 파일 추가
- Axios로 서버에 전송

```javascript
const formData = new FormData();
formData.append('title', title);
formData.append('artist', artist);
if (albumCover) {
  formData.append('albumCover', albumCover);
}

await client.post('/api/posts', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

**🔗 라우트에 업로드 미들웨어 연결 (postRoutes.js)**

```javascript
router.post('/', protect, upload.single('albumCover'), createPost);
```

**📊 효과**

- ✅ 서버 스토리지 부담 감소
- ✅ CDN을 통한 빠른 이미지 로딩
- ✅ 확장 가능한 인프라
- ✅ S3 URL로 어디서든 접근 가능

---

## 4️⃣ **음악 CRUD 및 실시간 UI 업데이트**

> 💡 핵심 기술: RESTful API, Mongoose, React Hooks (useState, useEffect)
> 

### 🎯 **도입 배경**

사용자가 음악을 추가, 조회, 삭제할 수 있는 완전한 기능이 필요했습니다. 서버와 클라이언트 간 효율적인 데이터 통신과 즉각적인 UI 피드백이 중요했습니다.

### ✅ **구현 내용**

**🔧 백엔드 RESTful API (postController.js)**

| HTTP 메서드 | 엔드포인트 | 기능 | 인증 필요 |
|------------|-----------|------|----------|
| `GET` | `/api/posts` | 사용자 음악 목록 조회 (최신순) | ✅ |
| `POST` | `/api/posts` | 새 음악 추가 (+ YouTube 검색) | ✅ |
| `DELETE` | `/api/posts/:id` | 음악 삭제 | ✅ |

**📝 Mongoose 스키마 설계 (Post.js)**

```javascript
const postSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  artist: { type: String },
  albumCoverUrl: { type: String },
  youtubeUrl: { type: String, default: '' },
}, { timestamps: true });
```

**⚛️ 프론트엔드 상태 관리**

**UploadForm.jsx - 음악 추가 폼**

- title, artist, albumCover 상태 관리
- 제목 필수 검증
- 업로드 중 버튼 비활성화
- 성공 시 폼 초기화 및 목록 갱신

**FileList.jsx - 음악 목록**

- useEffect로 초기 데이터 로딩
- 앨범 커버 클릭 시 YouTube 링크 이동
- 삭제 버튼으로 즉시 제거
- 낙관적 UI 업데이트 (서버 응답 전 UI 먼저 갱신)

```javascript
const handleDelete = async (postId) => {
  if (!window.confirm('이 기록을 정말 삭제하시겠습니까?')) return;
  
  await client.delete(`/api/posts/${postId}`);
  setPosts(posts.filter((post) => post._id !== postId)); // 즉시 UI 갱신
};
```

**UserDashboard.jsx - 대시보드 통합**

- UploadForm과 FileList를 하나의 화면에 통합
- onUploadSuccess 콜백으로 업로드 후 목록 자동 갱신
- key prop으로 FileList 강제 리렌더링

```javascript
const [refreshKey, setRefreshKey] = useState(0);

const handleUploadSuccess = () => {
  setRefreshKey(prev => prev + 1); // key 변경으로 FileList 재로딩
};

<FileList key={refreshKey} />
```

![image](https://via.placeholder.com/800x400.png?text=User+Dashboard)

→ 사용자 대시보드 (업로드 폼 + 음악 목록)

---

## 5️⃣ **React Router 기반 SPA 구현**

> 💡 핵심 기술: React Router DOM, Protected Routes, SPA Architecture
> 

### 🎯 **도입 배경**

랜딩 페이지와 사용자 대시보드를 분리하고, 로그인한 사용자만 대시보드에 접근할 수 있도록 라우팅 시스템이 필요했습니다.

### ✅ **구현 내용**

**🛣️ 라우팅 구조 (App.jsx)**

```javascript
<Routes>
  {/* 공개 경로 */}
  <Route path="/" element={<Landing />} />

  {/* 비공개 경로 (로그인 필요) */}
  <Route 
    path="/dashboard" 
    element={
      <ProtectRoute>
        <UserDashboard />
      </ProtectRoute>
    } 
  />
  
  {/* 잘못된 경로는 홈으로 */}
  <Route path="*" element={<Landing />} /> 
</Routes>
```

**🛡️ 보호된 라우트 HOC (ProtectRoute.jsx)**

- useAuth()로 로그인 상태 확인
- 로그인 안 되어 있으면 랜딩 페이지로 리다이렉트
- 로그인되어 있으면 children 컴포넌트 렌더링

```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return children;
};
```

**📊 효과**

- ✅ 페이지 새로고침 없는 부드러운 화면 전환
- ✅ 인증되지 않은 사용자의 대시보드 접근 차단
- ✅ 직관적인 URL 구조 (`/`, `/dashboard`)
- ✅ 잘못된 경로 입력 시 안전한 폴백

---

## 6️⃣ **Axios Interceptor로 자동 인증 헤더 추가**

> 💡 핵심 기술: Axios Instance, Request Interceptor, JWT Bearer Token
> 

### 🎯 **도입 배경**

매번 API 요청마다 수동으로 Authorization 헤더를 추가하는 것은 비효율적입니다. Axios Interceptor를 활용하여 자동으로 JWT 토큰을 헤더에 추가해야 했습니다.

### ✅ **구현 내용**

**🌐 Axios 인스턴스 생성 (client.js)**

```javascript
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000',
});

// 요청 인터셉터: 모든 요청에 자동으로 토큰 추가
client.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('musicmemo_user');
    if (user) {
      const token = JSON.parse(user).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default client;
```

**📊 효과**

- ✅ API 호출 코드 간소화 (토큰 수동 추가 불필요)
- ✅ 코드 중복 제거
- ✅ 인증 로직 중앙 관리
- ✅ 토큰 만료 시 일괄 처리 가능

**사용 예시**

```javascript
// Before (수동 토큰 추가)
await axios.get('/api/posts', {
  headers: { Authorization: `Bearer ${token}` }
});

// After (자동 토큰 추가)
await client.get('/api/posts');
```

---

## 7️⃣ **Sass(SCSS) 기반 Windows 95 스타일 UI**

> 💡 핵심 기술: Sass(SCSS), CSS Modules, Responsive Design
> 

### 🎯 **도입 배경**

프로젝트에 독창적인 레트로 감성을 부여하고, 재사용 가능한 스타일 시스템을 구축하기 위해 Sass를 도입했습니다.

### ✅ **구현 내용**

**🎨 Windows 95 디자인 시스템**

- 회색 그라데이션 배경
- 3D 버튼 효과 (inset/outset border)
- 픽셀 폰트 (DungGeunMo)
- CD 회전 애니메이션

**📁 컴포넌트별 SCSS 모듈화**

```
src/
├── App.scss               # 전역 스타일
├── index.scss             # 리셋 CSS
└── pages/
    └── style/
        ├── Landing.scss
        ├── UserDashboard.scss
        ├── UploadForm.scss
        └── FileList.scss
```

**💫 주요 스타일 패턴**

**Windows 버튼**

```scss
.windows-button {
  background: linear-gradient(to bottom, #dfdfdf 0%, #c0c0c0 100%);
  border: 2px outset #fff;
  box-shadow: 2px 2px 0px rgba(0,0,0,0.3);
  
  &:active {
    border-style: inset;
    box-shadow: inset 1px 1px 0px rgba(0,0,0,0.3);
  }
}
```

**회전하는 CD 애니메이션**

```scss
.rotating-cd-global {
  position: fixed;
  width: 200px;
  animation: spin 4s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**📊 효과**

- ✅ 독창적인 UI/UX 디자인
- ✅ 일관된 디자인 시스템
- ✅ 유지보수 용이한 SCSS 구조
- ✅ 반응형 디자인 지원

![image](https://via.placeholder.com/800x400.png?text=Windows+95+UI+Design)

→ Windows 95 스타일 UI

---

## 📊 3. 성과 및 기술적 이해도

### **성과**

✅ **핵심 기능 완성도**

| 항목 | 상태 | 설명 |
|------|------|------|
| JWT 인증 시스템 | ✅ | 회원가입/로그인/로그아웃 완벽 구현 |
| YouTube 자동 검색 | ✅ | youtube-sr로 자동 링크 연결 |
| AWS S3 업로드 | ✅ | 앨범 커버 클라우드 저장 |
| CRUD 기능 | ✅ | 음악 추가/조회/삭제 |
| SPA 라우팅 | ✅ | React Router 기반 페이지 전환 |
| 보호된 라우트 | ✅ | 인증된 사용자만 접근 가능 |

✅ **성능 및 사용성**

- Axios Interceptor로 API 호출 **코드 50% 이상 감소**
- YouTube 자동 검색으로 **사용자 편의성 대폭 향상**
- S3 CDN으로 **이미지 로딩 속도 개선**
- 낙관적 UI 업데이트로 **즉각적인 피드백**

✅ **보안**

- bcrypt로 비밀번호 **암호화 저장**
- JWT로 **무상태(stateless) 인증**
- 보호된 라우트로 **권한 없는 접근 차단**

---

### **기술적 이해도**

### 📌 **JWT(JSON Web Token) 기반 인증**

**설명**: JWT는 서버가 사용자 정보를 서명된 토큰으로 발급하고, 클라이언트가 이를 저장하여 매 요청마다 전송하는 방식입니다. 서버는 세션을 유지하지 않아 확장성이 뛰어납니다.

**구현 흐름**

1. 사용자 로그인 → 서버가 JWT 생성
2. 클라이언트가 localStorage에 저장
3. 매 API 요청 시 Authorization 헤더에 토큰 포함
4. 서버가 토큰 검증 → req.user에 사용자 정보 저장

```javascript
// 토큰 생성
jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// 토큰 검증
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

**효과**: 서버가 세션을 유지하지 않아 수평 확장 용이, RESTful API에 적합

---

### 📌 **React Context API를 활용한 전역 상태 관리**

**설명**: Props Drilling 문제를 해결하기 위해 Context API로 user, login, logout을 전역 상태로 관리. 모든 하위 컴포넌트에서 useAuth() 훅으로 쉽게 접근 가능.

**구현 패턴**

```javascript
// Context 생성 및 Provider
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅
export const useAuth = () => useContext(AuthContext);
```

**효과**: 컴포넌트 트리 깊이와 무관하게 인증 상태 접근 가능

---

### 📌 **Multer + AWS S3로 파일 업로드**

**설명**: Multer는 multipart/form-data를 파싱하는 미들웨어이며, Multer-S3는 업로드된 파일을 직접 S3에 저장합니다.

**설정**

```javascript
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
});

// 라우트에 적용
router.post('/', protect, upload.single('albumCover'), createPost);
```

**효과**: 서버 디스크를 사용하지 않고 바로 클라우드에 저장, 확장성 확보

---

### 📌 **youtube-sr 라이브러리를 활용한 YouTube 검색**

**설명**: youtube-sr은 YouTube Data API 없이도 YouTube 검색을 할 수 있는 스크래핑 기반 라이브러리입니다.

**사용법**

```javascript
const Youtube = require("youtube-sr").default;

const query = `${title} ${artist}`;
const video = await Youtube.searchOne(query, "video");

if (video) {
  const youtubeUrl = video.url; // https://www.youtube.com/watch?v=...
}
```

**효과**: API 키 불필요, 간단한 구현, 빠른 검색 속도

---

### 📌 **React Router의 Protected Routes 패턴**

**설명**: 인증이 필요한 페이지를 보호하기 위해 HOC(Higher-Order Component) 패턴을 사용합니다. 로그인하지 않은 사용자는 자동으로 리다이렉트됩니다.

**구현**

```javascript
const ProtectRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

// 사용
<Route path="/dashboard" element={<ProtectRoute><UserDashboard /></ProtectRoute>} />
```

**효과**: 권한 없는 접근 차단, 일관된 보안 정책 적용

---

### 📌 **Mongoose Middleware (pre-save hook)**

**설명**: Mongoose의 pre('save') 훅을 사용하여 모델 저장 전에 자동으로 비밀번호를 암호화합니다.

**구현**

```javascript
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

**효과**: 비밀번호 암호화 로직을 모델 레벨에서 관리, 코드 중복 방지

---

### 📌 **Axios Interceptor 패턴**

**설명**: Axios의 요청 인터셉터를 사용하여 모든 API 요청에 자동으로 JWT 토큰을 추가합니다.

**구현**

```javascript
client.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('musicmemo_user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

**효과**: API 호출 시 토큰을 수동으로 추가할 필요 없음, 코드 간소화

---

## 🔧 4. 문제 해결 사례

### 🚨 **문제 1: YouTube 검색 실패 시 서버 에러**

**상황**: 잘못된 곡 제목으로 YouTube 검색 시 서버가 크래시

**원인**: `youtube-sr` 검색 결과가 없을 때 예외 처리 부재

**해결**:

```javascript
try {
  const video = await Youtube.searchOne(query, "video");
  
  if (video) {
    foundYoutubeUrl = video.url;
    console.log(`[검색 성공] ${query} -> ${foundYoutubeUrl}`);
  } else {
    console.log(`[검색 실패] "${query}"에 대한 결과 없음`);
    foundYoutubeUrl = ''; // 빈 문자열로 저장
  }
} catch (error) {
  console.error("YouTube 검색 오류:", error);
  foundYoutubeUrl = ''; // 에러 시에도 빈 문자열
}
```

**💡 배운 점**

- 외부 API 호출은 항상 try-catch로 감싸기
- null 체크 필수
- 실패해도 서비스는 계속 작동하도록 설계

---

### 🚨 **문제 2: 앨범 업로드 후 목록이 갱신되지 않음**

**상황**: UploadForm에서 음악을 추가해도 FileList에 즉시 반영되지 않음

**원인**: FileList의 useEffect가 초기 로딩 시에만 실행되고, 이후 재실행되지 않음

**해결**:

```javascript
// UserDashboard.jsx
const [refreshKey, setRefreshKey] = useState(0);

const handleUploadSuccess = () => {
  setRefreshKey(prev => prev + 1); // key 변경으로 FileList 재마운트
};

<UploadForm onUploadSuccess={handleUploadSuccess} />
<FileList key={refreshKey} />
```

**💡 배운 점**

- React의 key prop 변경으로 컴포넌트 강제 재마운트 가능
- 부모-자식 간 콜백 함수로 상태 동기화

---

### 🚨 **문제 3: S3 업로드 시 CORS 에러**

**상황**: 프론트엔드에서 S3 이미지 로딩 시 CORS 에러 발생

**원인**: S3 버킷의 CORS 정책 미설정

**해결**:

1. S3 콘솔에서 CORS 정책 추가

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["http://localhost:5173"],
    "ExposeHeaders": []
  }
]
```

2. 버킷 정책에서 public-read 권한 설정

**💡 배운 점**

- AWS S3 CORS 설정의 중요성
- 클라우드 서비스 보안 정책 이해

---

### 🚨 **문제 4: JWT 토큰 만료 후 API 호출 실패**

**상황**: 30일 후 토큰이 만료되면 모든 API 요청이 401 에러

**원인**: 토큰 만료 시 자동 재로그인 로직 부재

**해결 (부분적)**:

```javascript
// Axios Response Interceptor 추가
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그아웃 처리
      localStorage.removeItem('musicmemo_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
```

**💡 배운 점**

- 토큰 만료 처리는 중요한 UX 요소
- Refresh Token 도입 고려 필요

---

### 🚨 **문제 5: 삭제 후 목록에서 사라지지 않음**

**상황**: 음악을 삭제해도 새로고침 전까지 UI에 남아있음

**원인**: 서버 API 호출 후 로컬 상태 업데이트 미흡

**해결**:

```javascript
const handleDelete = async (postId) => {
  if (!window.confirm('정말 삭제하시겠습니까?')) return;
  
  try {
    await client.delete(`/api/posts/${postId}`);
    // 삭제 성공 시 로컬 상태에서도 제거
    setPosts(posts.filter(post => post._id !== postId));
  } catch (err) {
    alert('삭제 실패');
  }
};
```

**💡 배운 점**

- 낙관적 UI 업데이트로 즉각적인 피드백 제공
- 서버 응답과 로컬 상태 동기화 중요

---

## 📈 5. 개선 가능한 부분

**단기 개선 사항**

- 🔄 **Refresh Token 도입**: Access Token 만료 시 자동 갱신
- 🎵 **음악 재생 기능**: YouTube iframe API로 웹 플레이어 내장
- 🔍 **검색 및 필터링**: 곡 제목/아티스트 검색 기능
- 📊 **페이지네이션**: 음악 목록이 많을 때 페이지 나누기
- ✏️ **수정 기능**: 이미 등록한 음악 정보 수정 (UPDATE)

**중기 개선 사항**

- 🎨 **드래그 앤 드롭**: 앨범 커버 업로드 UX 개선
- 🏷️ **태그 시스템**: 장르, 무드별 분류
- ❤️ **좋아요/별점**: 개인 평점 기능
- 📱 **모바일 반응형**: 태블릿/스마블 최적화
- 🌙 **다크 모드**: 테마 전환 기능

**장기 개선 사항**

- 🤝 **소셜 기능**: 친구와 음악 공유, 추천
- 🎧 **Spotify/Apple Music 연동**: 스트리밍 서비스 연결
- 📈 **통계 대시보드**: 가장 많이 들은 아티스트, 장르 분석
- 🔔 **알림 시스템**: 새 앨범 발매 알림
- 🌐 **다국어 지원**: i18n 라이브러리 도입

---

## 📚 6. 학습 및 성장

### 💻 **기술 스택 습득**

**Frontend**

- ⚛️ React 18 (Hooks, Context API, Router)
- ⚡ Vite (빠른 개발 서버)
- 🎨 Sass (SCSS)
- 📡 Axios (HTTP 클라이언트)

**Backend**

- 🟢 Node.js
- 🚂 Express 5
- 🍃 MongoDB + Mongoose
- 🔐 JWT + bcrypt
- ☁️ AWS S3
- 🎥 YouTube-sr
- 📤 Multer

**Tools**

- 📦 npm
- 🔄 nodemon
- 🔐 dotenv
- 🌿 Git

---

### 🎓 **핵심 개념 이해**

**Architecture & Patterns**

- ✅ JWT 기반 무상태(Stateless) 인증
- ✅ RESTful API 설계 원칙
- ✅ MVC 패턴 (Model-View-Controller)
- ✅ Context API 기반 전역 상태 관리
- ✅ HOC (Higher-Order Component) 패턴
- ✅ Axios Interceptor 패턴

**Web Technologies**

- ✅ HTTP 메서드와 상태 코드
- ✅ JWT (JSON Web Token) 인증 메커니즘
- ✅ bcrypt 암호화 알고리즘
- ✅ multipart/form-data 파일 업로드
- ✅ AWS S3 클라우드 스토리지
- ✅ CORS (Cross-Origin Resource Sharing)
- ✅ localStorage를 활용한 클라이언트 상태 영속성

**React Ecosystem**

- ✅ React Router DOM (SPA 라우팅)
- ✅ useState, useEffect, useContext Hooks
- ✅ Protected Routes 구현
- ✅ 낙관적 UI 업데이트 패턴
- ✅ key prop을 활용한 컴포넌트 재마운트

---

### 🛠️ **문제 해결 능력 향상**

**Debugging Skills**

- 🐛 콘솔 로그로 데이터 흐름 추적
- 🔍 네트워크 탭으로 API 요청/응답 분석
- 🚨 에러 메시지 해석 및 스택 트레이스 추적
- 📖 공식 문서 및 Stack Overflow 활용

**Problem Solving**

- 🧠 복잡한 문제를 작은 단위로 분해
- 🔄 재현 가능한 테스트 케이스 작성
- 💡 여러 해결 방법 비교 및 선택
- 📝 해결 과정 문서화 및 회고

---

### 👥 **협업 및 프로젝트 관리**

**Development Workflow**

- Git을 활용한 버전 관리
- 의미 있는 커밋 메시지 작성
- 기능 단위 브랜치 전략
- README 및 코드 주석 작성

---

## 🎯 7. 향후 계획

### 📅 **단기 목표 (1-2개월)**

1. **TypeScript 마이그레이션**
    - 타입 안정성 확보
    - 인터페이스 및 타입 정의
2. **테스트 코드 작성**
    - Jest + React Testing Library
    - API 엔드포인트 테스트
3. **성능 최적화**
    - React.memo, useMemo, useCallback 적용
    - 이미지 레이지 로딩
    - 코드 스플리팅

### 📆 **중기 목표 (3-6개월)**

1. **고급 인증 시스템**
    - Refresh Token 구현
    - 소셜 로그인 (Google, Kakao)
    - 이메일 인증
2. **실시간 기능**
    - Socket.io로 실시간 알림
    - 친구 활동 피드
3. **배포 및 DevOps**
    - AWS EC2 / Vercel 배포
    - GitHub Actions CI/CD
    - 모니터링 (Sentry, Google Analytics)

### 🚀 **장기 목표 (6개월 이상)**

1. **모바일 앱 개발**
    - React Native 학습
    - iOS/Android 앱 출시
2. **마이크로서비스 아키텍처**
    - API Gateway
    - 서비스 분리 (Auth, Post, Media)
3. **머신러닝 추천 시스템**
    - 사용자 취향 기반 음악 추천
    - 협업 필터링 알고리즘

---

## 📝 8. 마무리

### 🎓 **프로젝트를 통해 얻은 것**

이 프로젝트를 통해 **MERN 스택 기반 풀스택 개발 전체 흐름**을 이해하고, **실무에 가까운 개발 경험**을 쌓았습니다.

**주요 성과**

- 🔐 **보안**: JWT 인증, bcrypt 암호화, 보호된 라우트
- ☁️ **클라우드**: AWS S3 파일 저장소 활용
- 🎥 **외부 API 연동**: YouTube 자동 검색
- ⚛️ **React 고급 패턴**: Context API, Protected Routes, Interceptor
- 🚀 **완전한 CRUD**: 사용자 인증부터 데이터 관리까지

### 💪 **앞으로의 다짐**

**Next Steps**

1. TypeScript로 타입 안전성 확보
2. 테스트 코드 작성 습관화
3. 성능 최적화 및 코드 리팩토링
4. 오픈소스 기여 시작

**지속적 학습**

- Next.js로 SSR/SSG 학습
- GraphQL API 설계
- Docker 컨테이너화
- 클라우드 네이티브 아키텍처

---

## 🔗 **참고 링크**

- **GitHub Repository**: https://github.com/hym-dot/MUSICMEMO
- **기술 문서**: 
  - [React 공식 문서](https://react.dev)
  - [Express 공식 문서](https://expressjs.com)
  - [MongoDB 공식 문서](https://www.mongodb.com/docs)
  - [AWS S3 문서](https://docs.aws.amazon.com/s3)
  - [JWT.io](https://jwt.io)

---

**작성일**: 2025년 12월 30일  
**작성자**: 홍유민  
**프로젝트 기간**: 2025.08.19 ~ 2025.08.26
