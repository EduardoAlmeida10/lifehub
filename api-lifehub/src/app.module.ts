import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('LIFEHUB_DB_HOST'),
        port: Number(config.get<number>('LIFEHUB_DB_PORT')),
        username: config.get<string>('LIFEHUB_DB_USER'),
        password: config.get<string>('LIFEHUB_DB_PASSWORD'),
        database: config.get<string>('LIFEHUB_DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}
