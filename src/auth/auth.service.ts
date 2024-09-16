import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { hash, compare } from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor( 
    private readonly prisma: PrismaService,
    private jwtService: JwtService
  ){}

  async loginUser( loginUserDto: LoginUserDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { phone:loginUserDto.phone } })
      if(!user) throw new UnauthorizedException('El número de teléfono no existe en la base de datos');
      const correctPass = await compare(loginUserDto.password, user.password)
      if(!correctPass) throw new UnauthorizedException('La contraseña ingresada no es correcta');
      if(!user.is_active) throw new UnauthorizedException('El usuario esta inahbilidato en el sistema')

      const payload = {name:user.name, id:user.id, phone:user.phone, roles:user.role};

      const token = this.jwtService.sign(payload, {})

      return {
        name:user.name,
        phone:user.phone,
        roles:user.role,
        token
      }

    } catch (error) {
      console.log(error)
      if(error instanceof UnauthorizedException) throw error
      return new InternalServerErrorException()
    }
  }
}
