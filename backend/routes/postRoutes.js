// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/postController');
const { protect } = require('../middlewares/auth');
const upload = require('../src/s3'); // S3 업로드 미들웨어

// GET /api/posts - 모든 기록 조회
// POST /api/posts - 새 기록 생성
router.route('/')
    .get(protect, getPosts)
    .post(
        protect,
        // 여러 종류의 파일(앨범커버, 음악파일)을 업로드할 경우 .fields 사용
        upload.fields([
            { name: 'albumCover', maxCount: 1 },
            { name: 'music', maxCount: 1 }
        ]),
        createPost
    );

// (여기에 /api/posts/:id 에 대한 GET, PUT, DELETE 라우트 추가)

module.exports = router;