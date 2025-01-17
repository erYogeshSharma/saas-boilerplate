// auth/guards/role.guard.ts
import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard'; // Make sure you have a JWT guard
import { Role } from 'src/schemas/user.schema';

@Injectable()
export class RoleGuard extends JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // If no roles required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // user object comes from the JWT validation

    return requiredRoles.some((role) => role === user.role); // Check if user has the required role
  }
}
