import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './common/config/db.config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
