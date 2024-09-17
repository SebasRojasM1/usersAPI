/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import dbConfig from './libs/config/persistence/db-config';
import { ConfigModule } from '@nestjs/config';
import { persistenceModule } from './libs/config/persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      envFilePath: '.env',
    }),
    persistenceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
