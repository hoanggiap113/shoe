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
    //Lấy 'where' cơ bản từ 'filters' (nếu có)
    let where: Where<Sanpham> = filters?.where ?? {};

    //Thêm logic lọc tùy chỉnh (nếu có)
    if (customParams && Object.keys(customParams).length > 0) {
      where = this.buildAdvancedWhere(where, customParams);
    }

    //Xây dựng Filter cuối cùng
    const finalFilter: Filter<Sanpham> = {
      ...filters,
      where: where,
    };
    let includeArray: any[] = [];
    if (finalFilter.include) {
      if (Array.isArray(finalFilter.include)) {
        // Nếu nó đã là một mảng, chỉ cần gán
        includeArray = finalFilter.include;
      } else {
        includeArray = [finalFilter.include];
      }
    }
    // Gán lại finalFilter.include để nó CHẮC CHẮN là một mảng
    finalFilter.include = includeArray;
    const hasHangInclude = finalFilter.include.some(
      (item: any) => item.relation === 'hang',
    );
    if (!hasHangInclude) {
      finalFilter.include.push({relation: 'hang'});
    }

    const products = await this.sanphamRepo.find(finalFilter);

    if (
      products.length <= 0 &&
      (Object.keys(where).length > 0 || filters?.where)
    ) {
      throw new HttpErrors.NotFound(
        'Không tìm thấy sản phẩm nào phù hợp với điều kiện lọc.',
      );
    }

    return products;
  }

  async getProductById(id: number, filter?: Filter<Sanpham>): Promise<Sanpham> {
    const product = await this.sanphamRepo.findById(id, filter);
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
      !data.TrangThai
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

  private buildAdvancedWhere(
    baseWhere: Where<Sanpham>,
    customParams: CustomFilterParams,
  ): Where<Sanpham> {
    const where: any = {...baseWhere};
    const {ten, giaTu, giaDen, mauSac, mucDich} = customParams;

    if (ten) {
      where.TenSP = {like: `%${ten}%`, options: 'i'};
    }

    const giaFilter: any = (where.Gia as any) ?? {};
    if (giaTu) {
      giaFilter.gte = giaTu; // Lớn hơn hoặc bằng
    }
    if (giaDen) {
      giaFilter.lte = giaDen; // Nhỏ hơn hoặc bằng
    }
    if (giaTu || giaDen) {
      where.Gia = giaFilter;
    }
    // 2.3. Lọc theo Màu sắc
    if (mauSac) {
      const mauSacArray = mauSac.split(',').map(item => item.trim());
      if (mauSacArray.length > 0) {
        where.MauSac = {inq: mauSacArray};
      }
    }

    // 2.4. Lọc theo Mục đích
    if (mucDich) {
      const mucDichArray = mucDich.split(',').map(item => item.trim());
      if (mucDichArray.length > 0) {
        where.MucDich = {inq: mucDichArray};
      }
    }

    return where;
  }
}
