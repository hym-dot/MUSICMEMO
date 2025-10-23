// backend/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const { getPosts, createPost, deletePost } = require('../controllers/postController');
const { protect } = require('../middlewares/auth');
const upload = require('../src/upload'); // S3 업로드 미들웨어

// GET /api/posts - 모든 기록 조회
// POST /api/posts - 새 기록 생성
router.route('/')
    .get(protect, getPosts)
    .post(
        protect,
        // ▼▼▼ [수정됨] 'fields' 대신 'single' 사용 ▼▼▼
        upload.single('albumCover'),
        // ▲▲▲ [수정됨] ▲▲▲
        createPost
    );

// DELETE /api/posts/:id - (삭제)
router.route('/:id').delete(protect, deletePost);

module.exports = router;