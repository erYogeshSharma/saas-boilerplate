import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtAuthGuard } from './guards/jwt-auth.guard'; // JWT auth guard
import { SignUpDto } from './dto/sign-up.dto';
import { ForgotPasswordDto, SignInDto } from './dto/sign-in.dto';
import { Roles } from './decorator/roles.decorator';
import { Role } from 'src/schemas/user.schema';
import { RoleGuard } from './guards/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register a new user
  @Post('register')
  async register(@Body() createUserDto: SignUpDto) {
    return this.authService.register(createUserDto);
  }

  // Login route
  @Post('login')
  async login(@Body() loginDto: SignInDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  // Protect this route and allow only Admins
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin) // Only Admin role can access
  @Post('admin-protected')
  adminProtected() {
    return 'This is an admin-only route';
  }

  // Protect this route and allow only SuperAdmin
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.SuperAdmin) // Only SuperAdmin role can access
  @Post('superadmin-protected')
  superAdminProtected() {
    return 'This is a superadmin-only route';
  }
}
