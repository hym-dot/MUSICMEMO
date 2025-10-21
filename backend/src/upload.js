// src/s3.js (또는 middleware/upload.js)
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    //acl: 'public-read', // 외부에서 파일에 접근 가능하도록 설정
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // 파일 이름이 겹치지 않도록 날짜와 랜덤 문자열을 조합하여 키 생성
      const extension = path.extname(file.originalname);
      cb(null, `posts/${Date.now().toString()}_${Math.random().toString(36).substring(2, 15)}${extension}`);
    },
  }),
});

module.exports = upload;