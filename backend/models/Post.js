// models/Post.js
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // 작성자 ID
        required: true,
        ref: 'User', // User 모델을 참조
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    artist: {
        type: String,
        required: [true, 'Please add an artist name'],
    },
    albumCoverUrl: { // S3에 업로드된 앨범 커버 이미지 URL
        type: String,
    },
    musicUrl: { // S3에 업로드된 음악 파일 URL
        type: String,
    },
    memo: { // 간단한 메모
        type: String,
    },
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;