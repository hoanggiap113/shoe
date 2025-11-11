import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Donhang} from './donhang.model';
import {Sanpham} from './sanpham.model';

@model({name: 'ChiTietDonHang'})
export class Chitietdonhang extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  MaCTDH?: number;

  @belongsTo(() => Donhang, {name: 'donhang'})
  MaDH: number;

  @belongsTo(() => Sanpham, {name: 'sanpham'})
  MaSP: number;

  @property({
    type: 'number',
    required: true,
  })
  Soluong: number;

  @property({
    type: 'number',
    required: true,
  })
  DonGia: number;

  constructor(data?: Partial<Chitietdonhang>) {
    super(data);
  }
}
