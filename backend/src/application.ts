import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {SanphamService, DonhangService} from './services';
import {MySequence} from './sequence';
import {MulterFileUploadProvider} from './providers/file-upload.provider';

export {ApplicationConfig};

export class Backend2Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.service(SanphamService);
    this.service(DonhangService);
    this.sequence(MySequence);
    this.bind('middleware.FileUploadProvider').toProvider(
      MulterFileUploadProvider,
    );
    this.static('/files', path.join(__dirname, '../public'));
    this.static('/', path.join(__dirname, '../public'));

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js','.controller.ts'],
        nested: true,
      },
    };
  }
}
