import { registerAs } from '@nestjs/config';

export default registerAs('file', () => ({
  driver: process.env.FILE_DRIVER,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  maxFileSize: 5242880, // 5mb
}));
