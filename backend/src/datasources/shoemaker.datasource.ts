import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'shoemaker',
  connector: 'mysql',
  url: '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: "root",
  password: "hoanggiap113",
  database: "shoe"
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ShoemakerDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'shoemaker';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.shoemaker', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
