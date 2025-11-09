import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class VendorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    if (user.role !== 'VENDOR') {
      throw new ForbiddenException(
        'Acceso denegado: se requiere rol de vendor',
      );
    }

    return true;
  }
}
