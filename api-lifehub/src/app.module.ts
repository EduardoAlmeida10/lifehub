import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FacultyModule } from './faculty/faculty.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.LIFEHUB_DB_HOST,
      port: Number(process.env.LIFEHUB_DB_PORT),
      username: process.env.LIFEHUB_DB_USER,
      password: process.env.LIFEHUB_DB_PASSWORD,
      database: process.env.LIFEHUB_DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    FacultyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
