// controllers/postController.js
const Post = require('../models/Post');

// @desc    Get user's posts
// @route   GET /api/posts
const getPosts = async (req, res) => {
    // 로그인한 사용자의 post만 가져옴
    console.log("=== V2 새 코드가 실행되었습니다! ===");

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

// (여기에 getPostById, updatePost, deletePost 함수 추가)

module.exports = { getPosts, createPost /*, 등등 */ };