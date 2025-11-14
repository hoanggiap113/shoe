import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
// 👈 Đã thay đổi: Import ShoemakerDataSource
import {ShoemakerDataSource} from '../datasources'; 
import {DiaChiGiaoHang, Donhang} from '../models'; 
import {DonhangRepository} from './donhang.repository'; 

export class DiaChiGiaoHangRepository extends DefaultCrudRepository<
  DiaChiGiaoHang,
  typeof DiaChiGiaoHang.prototype.MaDiaChi,
  {}
> {
  public readonly donhang: BelongsToAccessor<
    Donhang,
    typeof DiaChiGiaoHang.prototype.MaDiaChi
  >;

  constructor(
    // 👈 Đã thay đổi: Inject ShoemakerDataSource
    @inject('datasources.shoemaker') dataSource: ShoemakerDataSource, 
    @repository.getter('DonhangRepository')
    protected donhangRepositoryGetter: Getter<DonhangRepository>,
  ) {
    super(DiaChiGiaoHang, dataSource);

    this.donhang = this.createBelongsToAccessorFor(
      'donhang',
      donhangRepositoryGetter,
    );
    this.registerInclusionResolver('donhang', this.donhang.inclusionResolver);
  }
}