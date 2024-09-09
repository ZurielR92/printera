import { Injectable } from '@nestjs/common';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { title } from 'process';
import { randomUUID } from 'crypto';

@Injectable()
export class ElementsService {

  constructor ( private readonly prisma: PrismaService ){}

  async create(createElementDto: CreateElementDto, id:string) {
    console.log(createElementDto)

    const elementId = randomUUID()
    const defaultCostId = randomUUID()

    const savedElement = await this.prisma.element.create({
      data:{
        id:elementId,
        name:createElementDto.name,
        type:createElementDto.type,
        process_type:createElementDto.process_type,
        unit_measure:createElementDto.unit_meausure,
        user:{
          connect:{
            id:id
          }
        },
        costs: {
          create: [
           ...createElementDto.costs.map((cost,i)=>{return { title:cost.title, amount:cost.amount, user:{connect:{id:id}}, elementId }})
          ]
        }
      },
    })
    return savedElement
  }

  findAll() {
    return `This action returns all elements`;
  }

  findOne(id: number) {
    return `This action returns a #${id} element`;
  }

  update(id: number, updateElementDto: UpdateElementDto) {
    return `This action updates a #${id} element`;
  }

  remove(id: number) {
    return `This action removes a #${id} element`;
  }
}
