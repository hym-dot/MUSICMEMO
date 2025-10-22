// backend/controllers/postController.js
const Post = require('../models/Post');

// @desc    Get user's posts
// @route   GET /api/posts
const getPosts = async (req, res) => {
    console.log("=== V2 새 코드가 실행되었습니다! ===");
    // 로그인한 사용자의 post만 가져옴
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });

    console.log("posts 변수의 정체:", posts);
    console.log("posts는 배열인가?", Array.isArray(posts));

    res.json(posts);
};

// @desc    Create a new post
// @route   POST /api/posts
const createPost = async (req, res) => {
    const { title, artist, memo } = req.body;

    try {
        const post = new Post({
            title,
            artist,
            memo,
            albumCoverUrl: req.files.albumCover ? req.files.albumCover[0].location : '',
            musicUrl: req.files.music ? req.files.music[0].location : '',
            user: req.user.id,
        });

        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// ▼▼▼ [새로 추가된 함수] ▼▼▼
// @desc    Delete a post
// @route   DELETE /api/posts/:id
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // 1. 포스트가 존재하는지 확인
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // 2. 로그인한 사용자가 포스트의 주인인지 확인
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // 3. 포스트 삭제
    await post.remove(); // Mongoose v6 이하
    // (Mongoose v7 이상인 경우: await Post.deleteOne({ _id: req.params.id });)

    res.json({ message: 'Post removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// ▲▲▲ [새로 추가된 함수] ▲▲▲


// (여기에 getPostById, updatePost 함수 추가)

module.exports = { 
  getPosts, 
  createPost,
  deletePost // ◀◀◀ [수정됨] deletePost 추가
};