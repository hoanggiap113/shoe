import {Entity, model, property} from '@loopback/repository';

@model({name: 'TrangThai'})
export class Trangthai extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  MaTrangthai?: number;

  @property({
    type: 'string',
    required: true,
  })
  TenTrangthai: string;

  constructor(data?: Partial<Trangthai>) {
    super(data);
  }
}
