
import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Donhang} from './donhang.model';

@model({name: 'DiaChiGiaoHang'})
export class DiaChiGiaoHang extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    MaDiaChi?: number;

    @property({
        type: 'string',
        required: true,
    })
    DiaChiChiTiet: string;

    @property({
        type: 'string',
    })
    QuanHuyen?: string;

    @property({
        type: 'string',
        required: true,
    })
    ThanhPho: string;
    
    // Mối quan hệ ngược (tùy chọn)
    @belongsTo(() => Donhang, {name: 'donhang'})
    MaDH: number; 

    constructor(data?: Partial<DiaChiGiaoHang>) {
        super(data);
    }
}