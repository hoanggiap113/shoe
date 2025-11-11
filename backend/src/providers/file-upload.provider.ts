import {Provider} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import multer from 'multer';
import path from 'path';

/**
 * Cấu hình lưu trữ file trên đĩa.
 */
const storage = multer.diskStorage({
  // Nơi lưu file
  destination: path.join(__dirname, '../../public/uploads'),
  
  // Cách đặt tên file
  filename: (req, file, cb) => {
    // Tạo tên file duy nhất (gắn timestamp) để tránh bị ghi đè
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

/**
 * Cấu hình Multer
 */
const multerOptions: multer.Options = {
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Chỉ chấp nhận file ảnh (image)
    if (!file.mimetype.startsWith('image/')) {
      return cb(new HttpErrors.BadRequest('Chỉ hỗ trợ file ảnh.'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
  },
};

/**
 * Lớp Provider này sẽ "cung cấp" một instance của multer
 * đã được cấu hình khi được inject.
 */
export class MulterFileUploadProvider implements Provider<multer.Multer> {
  constructor() {}

  value(): multer.Multer {
    // Trả về instance multer đã được cấu hình
    return multer(multerOptions);
  }
}