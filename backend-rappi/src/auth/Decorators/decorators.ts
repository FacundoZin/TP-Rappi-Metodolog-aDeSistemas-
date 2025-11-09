import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { AdminGuard } from '../Guards/admin.guard';
import { ClientGuard } from '../Guards/client.guard';

export function AdminOnly() {
  return applyDecorators(UseGuards(JwtAuthGuard, AdminGuard));
}

export function ClientOnly() {
  return applyDecorators(UseGuards(JwtAuthGuard, ClientGuard));
}

export function VendorOnly() {
  return applyDecorators(UseGuards(JwtAuthGuard, ClientGuard));
}
