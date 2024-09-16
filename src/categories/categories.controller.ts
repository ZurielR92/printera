import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { roles } from 'src/common/enums/roles.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

@Controller('categories')
@ApiTags('Categorias')
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(new ValidationPipe)
  @ApiOperation({summary:'Crear una nueva categoria'})
  @Auth(roles.ADMINISTRADOR)
  create(@Body() createCategoryDto: CreateCategoryDto, @ActiveUser() user:any) {
    return this.categoriesService.create(createCategoryDto, user.id);
  }

  @Get()
  @ApiOperation({summary:'Obtener todas las categorias'})
  @Auth(roles.COORDINADOR)
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({summary:'Buscar categoria por ID'})
  @Auth(roles.COORDINADOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({summary:'Actualizar una categoria'})
  @Auth(roles.ADMINISTRADOR)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({summary:'Inabilitar una ategoria'})
  @Auth(roles.ADMINISTRADOR)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
