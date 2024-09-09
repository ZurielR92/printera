import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [JwtModule, PrismaModule]
})
export class ContactsModule {}
