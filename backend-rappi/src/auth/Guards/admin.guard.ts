import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    if (user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Acceso denegado: se requiere rol de administrador',
      );
    }

    return true;
  }
}
