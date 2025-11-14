import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Hang} from './hang.model';

@model({name: 'SanPham'})
export class Sanpham extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  MaSP?: number;

  @property({
    type: 'string',
    required: true,
  })
  TenSP: string;

  @property({
    type: 'string',
    required: true,
  })
  MoTa: string;

  @property({
    type: 'number',
    required: true,
    mysql: { // <--- Chỉ cần thêm khối này
      columnName: 'Gia',
      dataType: 'decimal',
      precision: 10,
      scale: 2,
    },
  })
  Gia: number;

  @property({
    type: 'number',
    default: 0,
  })
  SoluongTon: number;

  @property({
    type: 'string',
  })
  KichCo?: string;

  @property({
    type: 'string',
  })
  MauSac?: string;

  @property({
    type: 'string',
    required: true,
  })
  HinhAnh: string;

  @belongsTo(() => Hang, {name: 'hang'})
  MaHang: number;

  @property({
    type: 'string',
  })
  GioiTinh?: string;

  @property({
    type: 'string',
    required: true,
  })
  MucDich: string;

  @property({
    type: 'string',
    required: true,
  })
  TrangThai: string;

  constructor(data?: Partial<Sanpham>) {
    super(data);
  }
}
