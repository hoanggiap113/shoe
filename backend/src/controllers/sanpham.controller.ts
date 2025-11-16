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
  getModelSchemaRef,
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
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sanpham, {includeRelations: true}),
        },
      },
    },
  })
  async getSanphams(
    @param.filter(Sanpham) filter?: Filter<Sanpham>,
    @param.query.object('customFilters', {
      type: 'object',
      properties: {
        ten: {type: 'string'},
        giaDen: {type: 'number'},
        giaTu: {type: 'number'},
        mucDich: {type: 'array', items: {type: 'string'}},
        maHang: {type: 'array', items: {type: 'number'}},
      },
    })
    customFilterParams?: CustomFilterParams,
  ): Promise<Sanpham[]> {
    try {
      console.log(customFilterParams);
      return await this.productService.getSanpham(filter, customFilterParams);
    } catch (error) {
      throw error;
    }
  }

  // GET BY ID
  @get('/products/{id}')
  @response(200, {
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sanpham, {includeRelations: true}),
      },
    },
  })
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
  @response(201, {
    description: 'Sanpham model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sanpham)}},
  })
  async createSanpham(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sanpham, {
            title: 'NewProduct',
            exclude: ['MaSP'],
          }),
        },
      },
    })
    body: Omit<Sanpham, 'MaSP'>,
  ): Promise<Sanpham> {
    try {
      console.log(body);
      return await this.productService.create(body);
    } catch (error) {
      throw error;
    }
  }

  // UPDATE
  @patch('/products/{id}')
  @response(204, {description: 'Sanpham PATCH success'})
  async updateSanpham(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sanpham, {partial: true}),
        },
      },
    })
    body: Partial<Sanpham>,
  ): Promise<void> {
    try {
      await this.productService.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  // DELETE
  @del('/products/{id}')
  @response(204, {
    description: 'Sanpham DELETE success',
  })
  async deleteSanpham(@param.path.number('id') id: number): Promise<void> {
    try {
      await this.productService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
