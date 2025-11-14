import {inject} from '@loopback/core';
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
import {Filter} from '@loopback/repository';
import {Sanpham} from '../models';
import {SanphamService} from '../services';
import {CustomFilterParams} from '../interface/productFilterParams';

export class SanphamController {
  constructor(
    @inject('services.SanphamService')
    private productService: SanphamService,
  ) {}

  // GET LIST
  @get('/products')
  @response(200)
  async getSanphams(
    @param.query.object('filter') filter?: Filter<Sanpham>,
    @param.query.string('ten') ten?: string,
    @param.query.number('giaTu') giaTu?: number,
    @param.query.number('giaDen') giaDen?: number,
    @param.query.string('mauSac') mauSac?: string,
    @param.query.string('mucDich') mucDich?: string,
    @param.query.number('maHang') maHang?: number, 
  ): Promise<Sanpham[]> {
    try {
      const customParams: CustomFilterParams = {
        ten,
        giaTu,
        giaDen,
        mauSac,
        mucDich,
        maHang,
        
      };
      return await this.productService.getSanpham(filter,customParams);
    } catch (error) {
      throw error;
    }
  }

  // GET BY ID
  @get('/products/{id}')
  @response(200)
  async getSanphamById(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Sanpham>,
  ): Promise<Sanpham> {
    try {
      console.log(filter);
      console.log(id);
      return await this.productService.getProductById(id, filter);
    } catch (error) {
      throw error;
    }
  }

  // CREATE
  @post('/products')
  @response(201)
  async createSanpham(
    @requestBody() body: Omit<Sanpham, 'MaSP'>,
  ): Promise<Sanpham> {
    try {
      return await this.productService.create(body);
    } catch (error) {
      throw error;
    }
  }

  // UPDATE
  @patch('/products/{id}')
  @response(204)
  async updateSanpham(
    @param.path.number('id') id: number,
    @requestBody() data: Partial<Sanpham>,
  ): Promise<void> {
    try {
      await this.productService.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  // DELETE
  @del('/products/{id}')
  @response(204)
  async deleteSanpham(@param.path.number('id') id: number): Promise<void> {
    try {
      await this.productService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
