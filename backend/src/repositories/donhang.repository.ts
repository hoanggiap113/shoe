import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  BelongsToAccessor,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {ShoemakerDataSource} from '../datasources';
import {Donhang, Khachhang, Trangthai, Chitietdonhang} from '../models';
import { KhachhangRepository } from './khachang.repository';
import {TrangthaiRepository} from './trangthai.repository';
import {ChitietdonhangRepository} from './chitietdonhang.repository';

export class DonhangRepository extends DefaultCrudRepository<
  Donhang,
  typeof Donhang.prototype.MaDH
> {
  public readonly khachhang: BelongsToAccessor<
    Khachhang,
    typeof Donhang.prototype.MaDH
  >;
  public readonly trangthai: BelongsToAccessor<
    Trangthai,
    typeof Donhang.prototype.MaDH
  >;
  public readonly chitietdonhangs: HasManyRepositoryFactory<
    Chitietdonhang,
    typeof Donhang.prototype.MaDH
  >;

  constructor(
    @inject('datasources.shoemaker') dataSource: ShoemakerDataSource,
    @repository.getter('KhachhangRepository')
    protected khachhangRepositoryGetter: Getter<KhachhangRepository>,
    @repository.getter('TrangthaiRepository')
    protected trangthaiRepositoryGetter: Getter<TrangthaiRepository>,
    @repository.getter('ChitietdonhangRepository')
    protected chitietdonhangRepositoryGetter: Getter<ChitietdonhangRepository>,
  ) {
    super(Donhang, dataSource);

    this.khachhang = this.createBelongsToAccessorFor(
      'khachhang',
      khachhangRepositoryGetter,
    );
    this.registerInclusionResolver('khachhang', this.khachhang.inclusionResolver);

    this.trangthai = this.createBelongsToAccessorFor(
      'trangthai',
      trangthaiRepositoryGetter,
    );
    this.registerInclusionResolver('trangthai', this.trangthai.inclusionResolver);

    this.chitietdonhangs = this.createHasManyRepositoryFactoryFor(
      'chitietdonhangs',
      chitietdonhangRepositoryGetter,
    );
    this.registerInclusionResolver('chitietdonhangs', this.chitietdonhangs.inclusionResolver);
  }
}
