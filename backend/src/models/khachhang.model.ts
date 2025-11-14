import {Entity, model, property} from '@loopback/repository';

@model({name: 'KhachHang'})
export class Khachhang extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  MaKH?: number;

  @property({
    type: 'string',
    required: true,
  })
  TenKH: string;

  @property({
    type: 'string',
    jsonSchema: {format: 'email'},
  })
  Email?: string;

  @property({
    type: 'string',
    required: true,
  })
  Sdt: string;

  @property({
    type: 'string',
    required: true,
  })
  MatKhau: string;

  constructor(data?: Partial<Khachhang>) {
    super(data);
  }
}
