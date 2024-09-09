import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ElementsService } from './elements.service';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { roles } from 'src/common/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

@Controller('elements')
@ApiTags('Materiales y/o Servicios')
@ApiBearerAuth()
export class ElementsController {
  constructor(private readonly elementsService: ElementsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({summary:'Crear un nuevo material y/o servicio'})
  @Auth(roles.ADMINISTRACION)
  create(@Body() createElementDto: CreateElementDto, @ActiveUser() user ) {
    return this.elementsService.create(createElementDto, user.id);
  }

  @Get()
  findAll() {
    return this.elementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElementDto: UpdateElementDto) {
    return this.elementsService.update(+id, updateElementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elementsService.remove(+id);
  }
}
