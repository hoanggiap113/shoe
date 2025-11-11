import {Entity, model, property, hasMany} from '@loopback/repository';
import { Sanpham } from './sanpham.model';

@model({name: 'Hang'})
export class Hang extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  MaHang?: number;

  @property({
    type: 'string',
    required: true,
  })
  TenHang: string;

  @property({
    type: 'string',
  })
  Mota?: string;

  @hasMany(() => Sanpham, {keyTo: 'MaHang'})
  sanphams: Sanpham[];

  constructor(data?: Partial<Hang>) {
    super(data);
  }
}
