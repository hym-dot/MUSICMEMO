// test-s3.js
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

// .env 파일의 환경 변수 로드
dotenv.config();

// 1. AWS S3 클라이언트 설정
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// 2. 업로드할 파일 정보 설정
const params = {
    Bucket: process.env.S3_BUCKET, // .env 파일에 설정한 버킷 이름
    Key: 'test-file.txt', // S3에 저장될 파일 이름
    Body: 'Hello, S3! This is a test file.', // 파일 내용
    ContentType: 'text/plain', // 파일 타입
    //ACL: 'public-read', // (옵션) 파일을 공개적으로 읽을 수 있게 설정
};

// 3. S3에 파일 업로드 실행
console.log('S3에 테스트 파일 업로드를 시도합니다...');

s3.upload(params, (err, data) => {
    if (err) {
        console.error('===== ❌ 업로드 실패 ❌ =====');
        console.error('에러:', err.message);
        console.error('===============================');
        console.log('Tip: .env 파일의 AWS 키와 버킷 이름, 리전이 정확한지 확인하세요.');
        console.log('Tip: IAM 사용자에게 "AmazonS3FullAccess" 권한이 있는지 확인하세요.');
    } else {
        console.log('===== ✅ 업로드 성공! ✅ =====');
        console.log('S3 파일 위치 (URL):', data.Location);
        console.log('===============================');
        console.log('이제 AWS S3 콘솔의 버킷 내부를 확인해보세요!');
    }
});