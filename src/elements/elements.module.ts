import { Module } from '@nestjs/common';
import { ElementsService } from './elements.service';
import { ElementsController } from './elements.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ElementsController],
  providers: [ElementsService],
  imports: [JwtModule, PrismaModule]
})
export class ElementsModule {}
