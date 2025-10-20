// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // 요청 헤더에 'Authorization'이 있고 'Bearer'로 시작하는지 확인
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 'Bearer ' 부분을 제외하고 토큰만 추출
            token = req.headers.authorization.split(' ')[1];

            // 토큰 검증
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 검증된 사용자의 정보를 req.user에 저장 (비밀번호 제외)
            req.user = await User.findById(decoded.id).select('-password');
            next(); // 다음 미들웨어나 컨트롤러로 이동
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };