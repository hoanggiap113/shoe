import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {ShoemakerDataSource} from '../datasources';
import {Khachhang, Donhang} from '../models';
import {DonhangRepository} from './donhang.repository';

export class KhachhangRepository extends DefaultCrudRepository<
  Khachhang,
  typeof Khachhang.prototype.MaKH
> {
  constructor(
    @inject('datasources.shoemaker') dataSource: ShoemakerDataSource,
    @repository.getter('DonhangRepository')
    protected donhangRepositoryGetter: Getter<DonhangRepository>,
  ) {
    super(Khachhang, dataSource);
  }
}
