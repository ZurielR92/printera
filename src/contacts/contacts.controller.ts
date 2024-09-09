import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { roles } from 'src/common/enums/roles.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('contacts')
@ApiTags('Contactos')
@ApiBearerAuth()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @Auth(roles.ADMINISTRACION)
  @UsePipes(new ValidationPipe())
  @ApiOperation({summary:'Crear un contacto', })
  create(@Body() createContactDto: CreateContactDto, @ActiveUser() user ) {
    return this.contactsService.create(createContactDto, {user_id:user.id});
  }

  @Get()
  @Auth()
  @ApiOperation({summary:'Obtener todos los usuarios'})
  @ApiQuery({name:'type', enum:['Todos', 'Clientes', 'Proveedores'], required:false})
  findAll( @Query('type') type:string ) {
    return this.contactsService.findAll(type);
  }

  @Get(':id')
  @ApiOperation({summary:'Obtener un usuario por ID'})
  @ApiParam({name:'id'})
  findOne(
    @Param('id') id: string,
    @Query('searchBy') searchBy:string='id'
  ) {
    return this.contactsService.findOne(id, searchBy);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactsService.update(+id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}
