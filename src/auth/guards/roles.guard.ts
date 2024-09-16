import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const request = context.switchToHttp().getRequest();


    const roles:string[] = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass()
    ])
    /* console.log(request.user.roles)
    console.log(roles) */

    if(request.user.roles === 'Administrador') {
      console.log('Permiso Administrador')
      return true
    }
    

    return roles.every(role => request.user.roles.includes(role));


    return true;
  }
}
