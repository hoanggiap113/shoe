import {
  Entity,
  model,
  property,
  hasMany,
  hasOne,
  belongsTo,
} from '@loopback/repository';
import {Trangthai} from './trangthai.model';
import {Chitietdonhang} from './chitietdonhang.model';
import { DiaChiGiaoHang } from './diachigiaohang.model';

@model({name: 'DonHang'})
export class Donhang extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  MaDH?: number;

  @property({
    type: 'string',
    required: true,
  })
  TenKH: string;

  @property({
    type: 'string',
    required: true,
  })
  SDT: string;

  @property({
    type: 'string',
  })
  Note?: string;

  @belongsTo(() => Trangthai, {name: 'trangthai'})
  MaTrangthai: number;
  @hasOne(() => DiaChiGiaoHang, {keyTo: 'MaDH'})
  MaDiaChi: DiaChiGiaoHang;
  @property({
    type: 'number',
    required: true,
  })
  TongTien: number;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  NgayDat?: string;

  @hasMany(() => Chitietdonhang, {keyTo: 'MaDH'})
  chitietdonhangs: Chitietdonhang[];

  constructor(data?: Partial<Donhang>) {
    super(data);
  }
}
