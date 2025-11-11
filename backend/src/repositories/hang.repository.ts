import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {ShoemakerDataSource} from '../datasources';
import {Hang, Sanpham} from '../models';
import {SanphamRepository} from './sanpham.repository';

export class HangRepository extends DefaultCrudRepository<
  Hang,
  typeof Hang.prototype.MaHang
> {
  public readonly sanphams: HasManyRepositoryFactory<
    Sanpham,
    typeof Hang.prototype.MaHang
  >;

  constructor(
    @inject('datasources.shoemaker') dataSource: ShoemakerDataSource,
    @repository.getter('SanphamRepository')
    protected sanphamRepositoryGetter: Getter<SanphamRepository>,
  ) {
    super(Hang, dataSource);

    this.sanphams = this.createHasManyRepositoryFactoryFor(
      'sanphams',
      sanphamRepositoryGetter,
    );
    this.registerInclusionResolver('sanphams', this.sanphams.inclusionResolver);
  }
}
