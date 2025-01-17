import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrgDto } from './org.dto';
import { OrgService } from './org.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/schemas/user.schema';

@Controller('org')
export class OrgController {
  constructor(private orgService: OrgService) {}

  @Post('update')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.SuperAdmin)
  updateOrg(@Body() orgDto: OrgDto) {
    return this.orgService.updateOrg(orgDto);
  }
}
