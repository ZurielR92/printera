import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [AuthModule, ConfigModule, CategoriesModule],
})
export class AppModule {}
