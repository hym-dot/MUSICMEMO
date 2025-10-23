// backend/models/Post.js
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  artist: {
    type: String,
  },
  albumCoverUrl: { // S3에 업로드된 앨범 커버 이미지 URL
    type: String,
  },
  // memo와 musicUrl 필드 삭제됨
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;