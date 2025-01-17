// auth/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/schemas/user.schema';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
