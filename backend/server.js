// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// 환경 변수 로드
dotenv.config();

// 데이터베이스 연결
connectDB();

const app = express();

// CORS 설정 및 Body Parser
app.use(cors());
app.use(express.json()); // req.body를 파싱하기 위함

// 라우트 연결
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));