// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {DonhangService} from '../services';
import {orderFilter} from '../interface/orderFilterParams';
import {
  get,
  post,
  patch,
  del,
  param,
  response,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import { FilterExcludingWhere } from '@loopback/repository';
import { Donhang } from '../models';
export class DonhangController {
  constructor(
    @inject('services.DonhangService') public orderService: DonhangService,
  ) {}
  @get('/orders')
  @response(200, {
    description: 'Danh sách các đơn hàng đã được lọc và phân trang',
    // Bạn có thể thêm schema response ở đây nếu muốn
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {'x-ts-type': Donhang},
        },
      },
    },
  })
  async getOrders(
    @param.query.object('filter') filterParams: orderFilter = {}, 
    @param.query.number('limit') limit: number = 10, 
    @param.query.number('skip') skip: number = 0, 
    @param.query.string('order') order?: string, 
  ) {
    try {
      const excludeFilter: FilterExcludingWhere<Donhang> = {
        limit: limit,
        skip: skip,
      };
      if (order) {
        excludeFilter.order = [order];
      }

      const orders = await this.orderService.getAllOrder(
        filterParams,
        excludeFilter,
      );

      return orders;
    } catch (err) {

      if (err instanceof HttpErrors.HttpError) {
        throw err;
      }
      console.error('Lỗi khi truy vấn đơn hàng:', err);
      throw new HttpErrors.InternalServerError(
        `Lỗi hệ thống: ${err.message || err}`,
      );
    }
  }
}
