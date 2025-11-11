import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Khachhang} from './khachhang.model';
import {Trangthai} from './trangthai.model';
import { Chitietdonhang } from './chitietdonhang.model';
@model({name: 'DonHang'})
export class Donhang extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  MaDH?: number;

  @belongsTo(() => Khachhang, {name: 'khachhang'})
  MaKH: number;

  @belongsTo(() => Trangthai, {name: 'trangthai'})
  MaTrangthai: number;

  @property({
    type: 'number',
    required: true,
  })
  TongTien: number;

  @property({
    type: 'string',
    required: true,
  })
  DiachiGiaohang: string;

  @hasMany(() => Chitietdonhang, {keyTo: 'MaDH'})
  chitietdonhangs: Chitietdonhang[];

  constructor(data?: Partial<Donhang>) {
    super(data);
  }
}
