import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasOneRepositoryFactory,
  HasManyRepositoryFactory,
  BelongsToAccessor,
} from '@loopback/repository';
// 👈 Đã thay đổi: Import ShoemakerDataSource
import {ShoemakerDataSource} from '../datasources';
import {Donhang, DiaChiGiaoHang, Chitietdonhang, Trangthai} from '../models';
import {DiaChiGiaoHangRepository} from './diachigiaohang.repository';
import {ChitietdonhangRepository} from './chitietdonhang.repository';
import {TrangthaiRepository} from './trangthai.repository';

export class DonhangRepository extends DefaultCrudRepository<
  Donhang,
  typeof Donhang.prototype.MaDH,
  {}
> {
  public readonly maDiaChi: HasOneRepositoryFactory<
    DiaChiGiaoHang,
    typeof Donhang.prototype.MaDH
  >;

  public readonly chitietdonhangs: HasManyRepositoryFactory<
    Chitietdonhang,
    typeof Donhang.prototype.MaDH
  >;

  public readonly trangthai: BelongsToAccessor<
    Trangthai,
    typeof Donhang.prototype.MaDH
  >;

  constructor(
    // 👈 Đã thay đổi: Inject ShoemakerDataSource
    @inject('datasources.shoemaker') dataSource: ShoemakerDataSource,
    @repository.getter('DiaChiGiaoHangRepository')
    protected diaChiGiaoHangRepositoryGetter: Getter<DiaChiGiaoHangRepository>,
    @repository.getter('ChitietdonhangRepository')
    protected chitietdonhangRepositoryGetter: Getter<ChitietdonhangRepository>,
    @repository.getter('TrangthaiRepository')
    protected trangthaiRepositoryGetter: Getter<TrangthaiRepository>,
  ) {
    super(Donhang, dataSource);

    this.trangthai = this.createBelongsToAccessorFor(
      'trangthai',
      trangthaiRepositoryGetter,
    );
    this.registerInclusionResolver(
      'trangthai',
      this.trangthai.inclusionResolver,
    );

    this.chitietdonhangs = this.createHasManyRepositoryFactoryFor(
      'chitietdonhangs',
      chitietdonhangRepositoryGetter,
    );
    this.registerInclusionResolver(
      'chitietdonhangs',
      this.chitietdonhangs.inclusionResolver,
    );

    this.maDiaChi = this.createHasOneRepositoryFactoryFor(
      'MaDiaChi',
      diaChiGiaoHangRepositoryGetter,
    );
    this.registerInclusionResolver('MaDiaChi', this.maDiaChi.inclusionResolver);
  }
}
