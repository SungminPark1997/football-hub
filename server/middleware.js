import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import multer from "multer";
const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3AvatarStorage = multerS3({
  s3: s3Client,
  bucket: "football-hub-2024",
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `avatars/${Date.now().toString()}`);
  },
});

export const avatarUpload = multer({
  limits: {
    fileSize: 3000000,
  },
  storage: s3AvatarStorage,
});
