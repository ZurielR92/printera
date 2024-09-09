import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactsService {

  constructor(
    private readonly prisma:PrismaService
  ){}

  async create(createContactDto: CreateContactDto, meta:{user_id:string}) {

    const userExist = await this.prisma.contact.findFirst({where:{
      OR:[
        { name: createContactDto.name },
        { email: createContactDto.email },
        { phone: createContactDto.phone }
      ]
    }});

    if(userExist) throw new ConflictException('El nombre/email/teléfono ya esta registrado en nuestra base de datos')

    const createdContact = await this.prisma.contact.create({data:{
      name: createContactDto.name,
      email: createContactDto.email,
      phone: createContactDto.phone,
      is_active:true,
      is_customer:createContactDto.is_customer,
      is_supplier:createContactDto.is_supplier,
      user_id:meta.user_id
    }})

    return createdContact;
  }

  async findAll( type:string='Todos' ) {

    const contacts = await this.prisma.contact.findMany({
      where:{ 
        AND:[
          {is_active:true},
          { ...type==='Todos' && {} },
          { ...type==='Clientes' && { is_customer:true, is_supplier:false } },
          { ...type==='Proveedores' && { is_customer:false, is_supplier:true } }
        ],
       },
      select:{
        id:true,
        name:true,
        phone:true,
        is_customer:true,
        is_supplier:true,
      },
    })
    return contacts;
  }

  async findOne(id: string, searchBy: string) {
    const contact = await this.prisma.contact.findFirst({
      where:{
        OR:[
          { ...searchBy === 'id' && { id:id } },
          { ...searchBy === 'phone' && { phone:id } },
          { ...searchBy === 'email' && { email: id } }
        ]
      }
    })
    if(!contact) throw new NotFoundException('No se ha encontrado el usuario')
    return contact
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
