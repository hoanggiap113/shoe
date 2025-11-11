import {inject} from '@loopback/core';
import {
  post,
  requestBody,
  Request,
  response,
  RestBindings,
  Response,
  HttpErrors,
} from '@loopback/rest';
import multer from 'multer';


export class FileUploadController {
  constructor(
    // Inject provider mà chúng ta đã đăng ký ở Bước 3
    @inject('middleware.FileUploadProvider')
    private fileUpload: multer.Multer,
  ) {}

  @post('/files', {
    responses: {
      '200': {
        description: 'Upload file thành công',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                files: {
                  type: 'array',
                  items: {type: 'string'},
                },
              },
            },
          },
        },
      },
    },
  })
  async uploadFiles(
    @requestBody({
      description: 'multipart/form-data',
      content: {
        'multipart/form-data': {
          'x-parser': 'stream', // Yêu cầu LoopBack xử lý dạng stream
          schema: {
            type: 'object',
            properties: {
              // 'files' là tên key khi gửi từ client (Postman/Next.js)
              files: { 
                type: 'array',
                items: {type: 'string', format: 'binary'},
              },
            },
          },
        },
      },
    })
    request: Request, // Inject Request
    @inject(RestBindings.Http.RESPONSE) response: Response, // Inject Response
  ): Promise<object> {
    
    // 1. Gọi handler của multer
    // 'files' là key, 10 là số file tối đa
    const uploadHandler = this.fileUpload.array('files', 10);

    // 2. Multer dùng callback, nên chúng ta bọc nó trong Promise
    // để controller có thể dùng async/await
    return new Promise((resolve, reject) => {
      uploadHandler(request, response, (err: any) => {
        if (err) return reject(err); // Trả về lỗi nếu có

        // 3. Kiểm tra xem file đã được upload chưa
        if (!request.files || (request.files as Express.Multer.File[]).length === 0) {
          return reject(new HttpErrors.BadRequest('Không có file nào được tải lên.'));
        }

        // 4. Lấy danh sách file đã upload
        const uploadedFiles = request.files as Express.Multer.File[];

        // 5. Tạo mảng các đường dẫn (URL)
        const filePaths = uploadedFiles.map(file => {
          // Nhớ lại Bước 3: static path là '/files', 
          // thư mục con trong 'public' là 'uploads'
          return `/files/uploads/${file.filename}`;
        });

        // 6. Trả về mảng đường dẫn cho client
        resolve({files: filePaths});
      });
    });
  }
}