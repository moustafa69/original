import { configSchema } from '../schemas/joi/config.schema';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from './app-config/app-config.service';

@Module({
  providers: [AppConfig],
  exports: [AppConfig], // Export AppConfig to make it available for other modules
})
export class EnvConfigModule {
  static register(): DynamicModule {
    const imports = [
      ConfigModule.forRoot({ validationSchema: configSchema() }),
    ];
    const providers = [AppConfig, ConfigService];

    return {
      module: EnvConfigModule,
      imports,
      providers,
      exports: providers,
    };
  }
}
