// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // 이메일은 고유해야 함
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // createdAt, updatedAt 자동 생성
});

// 사용자를 저장하기 전에 비밀번호를 암호화하는 로직
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// 로그인 시 입력된 비밀번호와 DB의 암호화된 비밀번호를 비교하는 메서드
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;