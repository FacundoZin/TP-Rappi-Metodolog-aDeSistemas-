import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ClientGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    if (user.role !== 'CLIENT') {
      throw new ForbiddenException(
        'Acceso denegado: se requiere rol de cliente',
      );
    }

    return true;
  }
}
