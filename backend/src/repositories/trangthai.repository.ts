import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ShoemakerDataSource} from '../datasources';
import {Trangthai} from '../models';

export class TrangthaiRepository extends DefaultCrudRepository<
  Trangthai,
  typeof Trangthai.prototype.MaTrangthai
> {
  constructor(
    @inject('datasources.shoemaker') dataSource: ShoemakerDataSource,
  ) {
    super(Trangthai, dataSource);
  }
}
