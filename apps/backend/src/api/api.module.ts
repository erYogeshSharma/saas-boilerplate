import { Module } from '@nestjs/common';
import { OrgController } from './org/org.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Organization,
  OrganizationSchema,
} from 'src/schemas/organization.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserService } from './user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { OrgService } from './org/org.service';
import { EmailService } from 'src/util/email/email.service';
import { UtilModule } from 'src/util/util.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
    AuthModule,
    UtilModule,
  ],
  controllers: [OrgController],
  providers: [UserService, OrgService, EmailService],
})
export class ApiModule {}
