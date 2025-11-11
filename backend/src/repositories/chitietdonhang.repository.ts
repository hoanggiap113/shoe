import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {ShoemakerDataSource} from '../datasources';
import {Chitietdonhang, Donhang, Sanpham} from '../models';
import {DonhangRepository} from './donhang.repository';
import {SanphamRepository} from './sanpham.repository';

export class ChitietdonhangRepository extends DefaultCrudRepository<
  Chitietdonhang,
  typeof Chitietdonhang.prototype.MaCTDH
> {
  public readonly donhang: BelongsToAccessor<
    Donhang,
    typeof Chitietdonhang.prototype.MaCTDH
  >;
  public readonly sanpham: BelongsToAccessor<
    Sanpham,
    typeof Chitietdonhang.prototype.MaCTDH
  >;

  constructor(
    @inject('datasources.shoemaker') dataSource: ShoemakerDataSource,
    @repository.getter('DonhangRepository')
    protected donhangRepositoryGetter: Getter<DonhangRepository>,
    @repository.getter('SanphamRepository')
    protected sanphamRepositoryGetter: Getter<SanphamRepository>,
  ) {
    super(Chitietdonhang, dataSource);

    this.donhang = this.createBelongsToAccessorFor('donhang', donhangRepositoryGetter);
    this.registerInclusionResolver('donhang', this.donhang.inclusionResolver);

    this.sanpham = this.createBelongsToAccessorFor('sanpham', sanphamRepositoryGetter);
    this.registerInclusionResolver('sanpham', this.sanpham.inclusionResolver);
  }
}
