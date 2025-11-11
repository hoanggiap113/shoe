import {Entity, model, property, hasMany} from '@loopback/repository';
import { Donhang } from './donhang.model';

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
    required: false,
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

  @hasMany(() => Donhang, {keyTo: 'MaKH'})
  donhangs: Donhang[];

  constructor(data?: Partial<Khachhang>) {
    super(data);
  }
}
