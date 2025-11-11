import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {ShoemakerDataSource} from '../datasources';
import {Sanpham, Hang} from '../models';
import {HangRepository} from './hang.repository';

export class SanphamRepository extends DefaultCrudRepository<
  Sanpham,
  typeof Sanpham.prototype.MaSP
> {
  public readonly hang: BelongsToAccessor<Hang, typeof Sanpham.prototype.MaSP>;

  constructor(
    @inject('datasources.shoemaker') dataSource: ShoemakerDataSource,
    @repository.getter('HangRepository')
    protected hangRepositoryGetter: Getter<HangRepository>,
  ) {
    super(Sanpham, dataSource);

    this.hang = this.createBelongsToAccessorFor('hang', hangRepositoryGetter);
    this.registerInclusionResolver('hang', this.hang.inclusionResolver);
  }
}
