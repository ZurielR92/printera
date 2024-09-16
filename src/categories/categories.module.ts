import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ JwtModule, PrismaModule ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
