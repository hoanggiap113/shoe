import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {
  repository,
  Where,
  FilterExcludingWhere,
  Filter,
} from '@loopback/repository';
import {DonhangRepository} from '../repositories/donhang.repository';
import {orderFilter} from '../interface/orderFilterParams';
import {Donhang} from '../models';
@injectable({scope: BindingScope.TRANSIENT})
export class DonhangService {
  constructor(
    @repository(DonhangRepository) private orderRepo: DonhangRepository,
  ) {}

  async getAllOrder(
    filterParams?: orderFilter,
    filterExcludingWhere?: FilterExcludingWhere<Donhang>,
  ) {
    const advanceFilter = this.handleAdvanceWhere(filterParams);
    const finalFilter: Filter<Donhang> = {
      ...filterExcludingWhere,
      ...advanceFilter,
      where: advanceFilter.where,
    };
    const orders = await this.orderRepo.find(finalFilter);
    return orders;
  }
  handleAdvanceWhere(params?: orderFilter): Filter<Donhang> {
    if (!params) return {};

    const where: Where<Donhang>[] = [];
    let include: any[] = [];


    if (params.customerName) where.push({TenKH: {like: `%${params.customerName}%`}});
    if (params.phone) where.push({SDT: {like: `%${params.phone}%`}});
    if (params.statusCode) where.push({MaTrangthai: params.statusCode});
    if (params.totalPriceFrom) where.push({TongTien: {gte: params.totalPriceFrom}});
    if (params.totalPriceTo) where.push({TongTien: {lte: params.totalPriceTo}});
    
    if (
      params.orderDate instanceof Date &&
      !isNaN(params.orderDate.getTime())
    ) {
      const startDay = params.orderDate;
      const endDay = new Date(startDay);
      endDay.setDate(endDay.getDate() + 1);

      where.push({
        NgayDat: {
          gte: startDay.toISOString(),
          lt: endDay.toISOString(),
        },
      });
    }
    // --- Lọc qua model liên quan (DiaChiGiaoHang) ---
    if (params.district || params.city || params.address) {
      const diaChiWhere: Where<any>[] = [];
      // Lọc theo Quận/Huyện (district) -> map với QuanHuyen
      if (params.district) {
        diaChiWhere.push({QuanHuyen: {like: `%${params.district}%`}});
      }

      if (params.city) {
        diaChiWhere.push({ThanhPho: {like: `%${params.city}%`}});
      }


      if (params.address) {
        diaChiWhere.push({DiaChiChiTiet: {like: `%${params.address}%`}});
      }


      include.push({
        relation: 'MaDiaChi',
        scope: {
          where: {and: diaChiWhere},
        },
      });
    }

    // Kết hợp tất cả các điều kiện và trả về Filter object
    const finalFilter: Filter<Donhang> = {};

    if (where.length > 0) {
      finalFilter.where = {and: where};
    }

    if (include.length > 0) {
      finalFilter.include = include;
    }

    return finalFilter;
  }
}
