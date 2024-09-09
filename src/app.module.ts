import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { ElementsModule } from './elements/elements.module';

@Module({
  imports: [AuthModule, ContactsModule, ElementsModule],
})
export class AppModule {}
