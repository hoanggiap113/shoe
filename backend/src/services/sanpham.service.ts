import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {SanphamRepository} from '../repositories/sanpham.repository';
import {repository, Filter, Where} from '@loopback/repository';
import {Sanpham} from '../models';
import {CustomFilterParams} from '../interface/productFilterParams';

@injectable({scope: BindingScope.TRANSIENT})
export class SanphamService {
  constructor(
    @repository(SanphamRepository) private sanphamRepo: SanphamRepository,
  ) {}

  async getSanpham(
    filters?: Filter<Sanpham>,
    customParams?: CustomFilterParams,
  ): Promise<Sanpham[]> {
    const allConditions: Where<Sanpham>[] = [{IsActive: true}];

    const baseWhere: Where<Sanpham> = filters?.where ?? {};
    if (Object.keys(baseWhere).length > 0) {
      if ('and' in baseWhere && Array.isArray(baseWhere.and)) {
        allConditions.push(...baseWhere.and);
      } else {
        allConditions.push(baseWhere);
      }
    }

    if (customParams) {
      const advancedConditions = this.buildAdvancedConditions(customParams);
      allConditions.push(...advancedConditions);
    }

    let finalWhere: Where<Sanpham> = {};
    if (allConditions.length > 0) {
      finalWhere = {and: allConditions};
    }

    const finalInclude = [...(filters?.include ?? []), {relation: 'hang'}];
    const finalFilter: Filter<Sanpham> = {
      ...filters,
      where: finalWhere,
      include: finalInclude,
    };

    const products = await this.sanphamRepo.find(finalFilter);
    return products.length > 0 ? products : [];
  }

  async getProductById(id: number, filter?: Filter<Sanpham>): Promise<Sanpham> {
    const finalFilter: Filter<Sanpham> = {
      ...filter,
      include: [...(filter?.include ?? []), {relation: 'hang'}],
    };
    const product = await this.sanphamRepo.findById(id, finalFilter);
    if (!product) {
      throw new HttpErrors.NotFound('Không tìm thấy sản phẩm');
    }
    console.log(product);
    return product;
  }

  async create(data: Omit<Sanpham, 'MaSP'>): Promise<Sanpham> {
    if (
      !data.Gia ||
      data.Gia < 0 ||
      isNaN(data.Gia) ||
      !isFinite(data.Gia) ||
      typeof data.Gia !== 'number'
    ) {
      throw new HttpErrors.BadRequest('Giá sản phẩm không hợp lệ');
    }
    const existing = await this.sanphamRepo.findOne({
      where: {TenSP: data.TenSP.trim()},
    });
    if (existing) {
      throw new HttpErrors.Conflict(
        'Tên sản phẩm đã tồn tại, vui lòng chọn tên khác',
      );
    }

    const newProduct = await this.sanphamRepo.create(data);
    return newProduct;
  }

  async update(id: number, data: Partial<Sanpham>): Promise<void> {
    const product = await this.sanphamRepo.findById(id);
    if (!product) {
      throw new HttpErrors.NotFound('Không tìm thấy sản phẩm để cập nhật');
    }

    await this.sanphamRepo.updateById(id, data);
  }

  async delete(id: number): Promise<void> {
    const product = await this.sanphamRepo.findById(id);
    if (!product) {
      throw new HttpErrors.NotFound('Không tìm thấy sản phẩm để xóa');
    }
    await this.sanphamRepo.updateById(id, {IsActive: false});
  }

  private buildAdvancedConditions(
    params: CustomFilterParams,
  ): Where<Sanpham>[] {
    const {ten, giaTu, giaDen, mucDich, maHang} = params;
    const conditions: Where<Sanpham>[] = [];

    if (ten && ten.trim() !== '') {
      conditions.push({TenSP: {like: `%${ten.trim()}%`}});
    }

    // Bắt buộc 2 cái này phải kiểm tra undefined và null vì giá có thể là 0 và phải chuyển type lần nữa ko có nó lỗi và tách riêng nó ra.
    if (giaTu !== undefined && giaTu !== null) {
      const giaTuNum = Number(giaTu);
      conditions.push({Gia: {gte: giaTuNum}});
    }

    if (giaDen !== undefined && giaDen !== null) {
      const giaDenNum = Number(giaDen);
      conditions.push({Gia: {lte: giaDenNum}});
    }

    if (Array.isArray(maHang) && maHang.length > 0) {
      conditions.push({MaHang: {inq: maHang}});
    }

    if (Array.isArray(mucDich) && mucDich.length > 0) {
      conditions.push({MucDich: {inq: mucDich}});
    }
    return conditions;
  }
}
