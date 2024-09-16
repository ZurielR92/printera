import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {

  constructor(
    private readonly prisma:PrismaService
  ){}


  async create(createCategoryDto: CreateCategoryDto, userId:string) {
    try {
      const savedCategory = await this.prisma.category.create({
        data:{
          ...createCategoryDto,
          created_by:{connect:{id:userId}}
        }
      })
      return savedCategory;
    } catch (error) {
      if(error.code === 'P2002') throw new ConflictException(`the field "${error.meta.target[0]}" already exist in database`)
      return new InternalServerErrorException()
    }
  }

  async findAll() {

    try {
      const categories = await this.prisma.category.findMany({where:{is_active:true}})
      return categories
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.prisma.category.findUnique({where:{id:id}})
      if(!category) throw new NotFoundException('The category does not exist in the database')
      return category
    } catch (error) {
      throw error 
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {

      const categoryExist = await this.prisma.category.findUnique({where:{name:updateCategoryDto.name}})
      if(categoryExist && categoryExist.id!=='id') throw new ConflictException(`The is already a category with de name "${updateCategoryDto.name}"`)

      const updatedCategory = await this.prisma.category.update({where:{id:id},data:updateCategoryDto})
      return updatedCategory
    } catch (error) {
      throw error
    }
    return `This action updates a #${id} category`;
  }

  async remove(id: string) {
    try {
      const deletedCategory = await this.prisma.category.update({where:{id}, data:{is_active:false}})
      return deletedCategory
    } catch (error) {
      throw error
    }
  }
}
