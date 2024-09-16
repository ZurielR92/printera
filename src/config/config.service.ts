import { Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import { roles } from 'src/common/enums/roles.enum';
import { randomUUID } from 'crypto';
import { ProcessTypes } from 'src/common/enums/proces_type.enum';
import { UnitMeausure } from 'src/common/enums/unit_meausure.enum';
import { ProductType } from 'src/common/enums/product-type.enum';

@Injectable()
export class ConfigService {

  constructor(
    private readonly prisma:PrismaService
  ){}

  async initSeed(){

    const hashPass = await hash('2121',10)
    const userId = randomUUID()

    await this.prisma.user.create({
      data:{
        id:userId,
        name:'Victor Ramos',
        password: hashPass,
        phone:'3137082992',
        role: roles.ADMINISTRADOR,
        created_by_id:userId
      }
    })

    const vinilosId = randomUUID()
    const lonasId = randomUUID()
    const propalcotesId = randomUUID()
    const adhesivosId = randomUUID()
    const impresionId = randomUUID()
    const terminadosId = randomUUID()

    await this.prisma.category.createMany({
      data:[
        { id:vinilosId, name:'Vinilos', user_id:userId },
        { id:lonasId, name:'Lonas', user_id:userId },
        { id:propalcotesId, name:'Propalcotes', user_id:userId },
        { id:adhesivosId, name:'Adhesivos', user_id:userId },
        { id:impresionId, name:'Impresion', user_id:userId },
        { id:terminadosId, name:'Terminados', user_id:userId },
      ]
    })
    
    
    //REGISTRO DE VINILO BLANCO
    const viniloBlancoId = randomUUID();
    await this.prisma.product.create({
      data:{
        id:viniloBlancoId,
        name:'Vinilo Blanco',
        process: ProcessTypes.GRAN_FORMATO,
        meausure_unit: UnitMeausure.CM2,
        type: ProductType.MATERIAL,
        category:{connect:{id:vinilosId}},
        user:{connect:{id:userId}},
        costs:{
          createMany:{
            data:[
              { name:'General', cost:0.7, user_id:userId},
              { name:'Promocional', cost:0.5, user_id:userId}
            ]
          }
        },
        prices:{
          createMany:{
            data: [
              { name:'General', price:1.1, user_id:userId }
            ]
          }
        }
      }
    })


    //REGISTRO DE VINILO TRANSPARENTE
    const viniloTransparenteId = randomUUID();
    await this.prisma.product.create({
      data:{
        id:viniloTransparenteId,
        name:'Vinilo Transparente',
        process: ProcessTypes.GRAN_FORMATO,
        meausure_unit: UnitMeausure.CM2,
        type: ProductType.MATERIAL,
        category:{connect:{id:vinilosId}},
        user:{connect:{id:userId}},
        costs:{
          createMany:{
            data:[
              { name:'General', cost:0.7, user_id:userId},
              { name:'Promocional', cost:0.5, user_id:userId}
            ]
          }
        },
        prices:{
          createMany:{
            data: [
              { name:'General', price:1.1, user_id:userId }
            ]
          }
        }
      }
    })


    //REGISTRO DE LONAS
    const lonaId = randomUUID();
    await this.prisma.product.create({
      data:{
        id:lonaId,
        name:'Lona Banner',
        process: ProcessTypes.GRAN_FORMATO,
        meausure_unit: UnitMeausure.CM2,
        type: ProductType.MATERIAL,
        category:{connect:{id:lonasId}},
        user:{connect:{id:userId}},
        costs:{
          createMany:{
            data:[
              { name:'13oz', cost:0.8, user_id:userId},
              { name:'10oz', cost:0.6, user_id:userId}
            ]
          }
        },
        prices:{
          createMany:{
            data: [
              { name:'General', price:1.1, user_id:userId }
            ]
          }
        }
      }
    })


    //REGISTRO DE SERVICIO IMPRESIÓN GRAN FORMATO
    const impresionGranFormatoId = randomUUID();
    await this.prisma.product.create({
      data:{
        id:impresionGranFormatoId,
        name:'Impresión Gran Formato',
        process: ProcessTypes.GRAN_FORMATO,
        meausure_unit: UnitMeausure.CM2,
        type: ProductType.SERVICIO,
        category:{connect:{id:impresionId}},
        user:{connect:{id:userId}},
        costs:{
          createMany:{
            data:[
              { name:'General', cost:0.5, user_id:userId},
            ]
          }
        },
        prices:{
          createMany:{
            data: [
              { name:'General', price:1, user_id:userId }
            ]
          }
        }
      }
    })


    //REGISTRO DE SERVICIO TERMINADO DE VINILOS
    const terminadoViniloId = randomUUID();
    await this.prisma.product.create({
      data:{
        id:terminadoViniloId,
        name:'Terminado de Vinilos',
        process: ProcessTypes.GRAN_FORMATO,
        meausure_unit: UnitMeausure.CM2,
        type: ProductType.SERVICIO,
        category:{connect:{id:terminadosId}},
        user:{connect:{id:userId}},
        costs:{
          createMany:{
            data:[
              { name:'Kubica', cost:0.1, user_id:userId},
            ]
          }
        },
        prices:{
          createMany:{
            data: [
              { name:'Kubica', price:3, user_id:userId }
            ]
          }
        }
      }
    })



    //REGISTRO DE SERVICIO TERMINADO DE LONAS
    const terminadoLonaId = randomUUID();
    await this.prisma.product.create({
      data:{
        id:terminadoLonaId,
        name:'Terminado de Lonas',
        process: ProcessTypes.GRAN_FORMATO,
        meausure_unit: UnitMeausure.CM2,
        type: ProductType.SERVICIO,
        category:{connect:{id:terminadosId}},
        user:{connect:{id:userId}},
        costs:{
          createMany:{
            data:[
              { name:'Kubica', cost:0.1, user_id:userId},
            ]
          }
        },
        prices:{
          createMany:{
            data: [
              { name:'Kubica', price:0.3, user_id:userId }
            ]
          }
        }
      }
    })




    //REGISTRO DE PRODUCTO LONA IMPRESA
    const lonaImpresaId = randomUUID();
    await this.prisma.product.create({
      data:{
        id:lonaImpresaId,
        name:'Lona + Impresión',
        process: ProcessTypes.GRAN_FORMATO,
        meausure_unit: UnitMeausure.CM2,
        type: ProductType.PRODUCTO,
        category:{connect:{id:lonasId}},
        user:{connect:{id:userId}},
        components:{
          createMany:{
            data: [
              { in_component_id:lonaId },
              { in_component_id:impresionGranFormatoId },
              { in_component_id:terminadoLonaId }
            ]
          }
        },
        prices:{
          createMany:{
            data: [
              { name:'Alcaldía', price:6, user_id:userId },
              { name:'Empleados', price:3, user_id:userId },
              { name:'Revendedores', price:4, user_id:userId },
              { name:'Clientes Externos', price:7, user_id:userId },
            ]
          }
        }
      }
    })



    //REGISTRO DE PRODUCTO LONA IMPRESA
    const viniloImpresoId = randomUUID();
    await this.prisma.product.create({
      data:{
        id:viniloImpresoId,
        name:'Vinilo Blanco + Impresión',
        process: ProcessTypes.GRAN_FORMATO,
        meausure_unit: UnitMeausure.CM2,
        type: ProductType.PRODUCTO,
        category:{connect:{id:vinilosId}},
        user:{connect:{id:userId}},
        components:{
          createMany:{
            data: [
              { in_component_id:viniloBlancoId },
              { in_component_id:viniloTransparenteId },
              { in_component_id:impresionGranFormatoId },
              { in_component_id:terminadoViniloId }
            ]
          }
        },
        prices:{
          createMany:{
            data: [
              { name:'Alcaldía', price:7, user_id:userId },
              { name:'Empleados', price:4, user_id:userId },
              { name:'Revendedores', price:3, user_id:userId },
              { name:'Clientes Externos', price:8, user_id:userId },
            ]
          }
        }
      }
    })



    return 'Todo bien'

  }

  create(createConfigDto: CreateConfigDto) {
    return 'This action adds a new config';
  }

  findAll() {
    return `This action returns all config`;
  }

  findOne(id: number) {
    return `This action returns a #${id} config`;
  }

  update(id: number, updateConfigDto: UpdateConfigDto) {
    return `This action updates a #${id} config`;
  }

  remove(id: number) {
    return `This action removes a #${id} config`;
  }
}
