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
    // Gom điều kiện where
    const finalWhere: any = filters?.where ? {...filters.where} : {};

    if (customParams) {
      Object.assign(finalWhere, this.buildAdvancedWhere(customParams));
    }

    const finalFilter: Filter<Sanpham> = {
      ...filters,
      where: finalWhere,
      include: [{relation: 'hang'}],
    };
    console.log(finalFilter);

    const products = await this.sanphamRepo.find(finalFilter);

    if (products.length === 0 && Object.keys(finalWhere).length > 0) {
      throw new HttpErrors.NotFound(
        'Không tìm thấy sản phẩm nào phù hợp với điều kiện lọc.',
      );
    }

    return products;
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
      !data.TenSP ||
      !data.Gia ||
      !data.HinhAnh ||
      !data.MucDich ||
      !data.TrangThai ||
      !data.MaHang
    ) {
      throw new HttpErrors.BadRequest('Thiếu dữ liệu bắt buộc');
    }

    const exist = await this.sanphamRepo.findOne({
      where: {TenSP: data.TenSP.trim()},
    });

    if (exist) {
      throw new HttpErrors.Conflict('Tên sản phẩm đã tồn tại');
    }

    return this.sanphamRepo.create(data);
  }

  // UPDATE
  async update(id: number, data: Partial<Sanpham>): Promise<void> {
    const product = await this.sanphamRepo.findById(id);
    if (!product) {
      throw new HttpErrors.NotFound('Không tìm thấy sản phẩm để cập nhật');
    }

    if (data.TenSP) {
      const dup = await this.sanphamRepo.findOne({
        where: {
          TenSP: data.TenSP.trim(),
          MaSP: {neq: id},
        },
      });
      if (dup) {
        throw new HttpErrors.Conflict(
          'Tên sản phẩm đã tồn tại, vui lòng chọn tên khác',
        );
      }
    }

    await this.sanphamRepo.updateById(id, data);
  }

  // DELETE
  async delete(id: number): Promise<void> {
    const product = await this.sanphamRepo.findById(id);
    if (!product) {
      throw new HttpErrors.NotFound('Không tìm thấy sản phẩm để xóa');
    }

    await this.sanphamRepo.deleteById(id);
  }

  private buildAdvancedWhere(params: CustomFilterParams): Where<Sanpham> {
    const where: any = {};
    const {ten, giaTu, giaDen, mucDich, maHang} = params;

    const andConditions: Where<Sanpham>[] = [];
    if (ten && ten.trim() !== '') {
      where.TenSp = {like: `%${ten}%`, options: 'i'};
    }
    if (giaTu !== undefined) {
      andConditions.push({Gia: {gte: giaTu}});
    }
    if (giaDen !== undefined) {
      andConditions.push({Gia: {lte: giaDen}});
    }
    if (Array.isArray(maHang) && maHang.length > 0) {
      where.maHang = {inq: maHang};
    }
    if (mucDich) {
      const arr = mucDich.split(',').map(i => i.trim());
      if (arr.length > 0) {
        where.MucDich = {inq: arr};
      }
    }
    if (andConditions.length > 0) {
      where.and = andConditions;
    }
    return where;
  }
}
