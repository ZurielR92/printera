import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { roles } from 'src/common/enums/roles.enum';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UsePipes( new ValidationPipe() )
  @ApiOperation({ summary: 'Iniciar sesión'})
  login ( @Body() loginUserDto: LoginUserDto ) {
    return this.authService.loginUser(loginUserDto)
  }

  @Get( 'profile' )
  @Auth( roles.ADMINISTRADOR )
  @ApiOperation({description:'Obtener el usuario actual'})
  profile (@ActiveUser() user) {
    return user
  }

  /* @Get('profile')
  @Roles('Master')
  @UseGuards(AuthGuard, RolesGuard)
  profile (
    @Req()
    req: Request & {user:any}
  ) {
    return req.user
  } */
  
}
