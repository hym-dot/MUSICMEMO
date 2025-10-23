// backend/controllers/postController.js
const Post = require('../models/Post');
// ▼▼▼ [새로 추가] 유튜브 검색 라이브러리 ▼▼▼
const Youtube = require("youtube-sr").default;
// ▲▲▲ [새로 추가] ▲▲▲

// @desc    Get user's posts
// @route   GET /api/posts
const getPosts = async (req, res) => {
    // ... (기존 getPosts 코드) ...
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(posts); // DB에 저장된 youtubeUrl도 같이 전송됩니다.
};

// @desc    Create a new post
// @route   POST /api/posts
const createPost = async (req, res) => {
    const { title, artist } = req.body; // 프론트에서 title, artist를 받음
    let foundYoutubeUrl = ''; // 찾은 URL을 저장할 변수

    try {
        // ▼▼▼ [새로 추가] 유튜브 자동 검색 로직 ▼▼▼
        if (title) { // 곡 제목이 있는 경우에만 검색
            // 1. 검색어 생성 (예: "Amazing Uneducated kid")
            const query = `${title} ${artist || ''}`;
            
            // 2. 유튜브에서 "비디오" 1개만 검색
            const video = await Youtube.searchOne(query, "video");

            // 3. 검색 결과가 있으면 URL 저장
            if (video) {
                foundYoutubeUrl = video.url;
                console.log(`[YouTube 검색 성공] ${query} -> ${foundYoutubeUrl}`);
            } else {
                console.log(`[YouTube 검색 실패] "${query}"에 대한 결과 없음`);
            }
        }
        // ▲▲▲ [새로 추가] ▲▲▲

        // 4. DB에 포스트 저장
        const post = new Post({
            title,
            artist,
            albumCoverUrl: req.file ? req.file.location : '',
            youtubeUrl: foundYoutubeUrl, // ◀◀◀ 찾은 URL을 DB에 저장
            user: req.user.id,
        });

        const createdPost = await post.save();
        res.status(201).json(createdPost); // 프론트로 생성된 포스트 정보 전송
    } catch (error) {
        console.error("포스트 저장/검색 중 오류:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Post.deleteOne({ _id: req.params.id });

    res.json({ message: 'Post removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { 
  getPosts, 
  createPost,
  deletePost 
};