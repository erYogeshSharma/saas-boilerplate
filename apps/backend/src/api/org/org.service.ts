import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from 'src/schemas/organization.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class OrgService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Organization.name)
    private readonly OrgModel: Model<Organization>,
  ) {}

  async updateOrg(orgDto: any) {
    try {
    } catch (err) {
      throw err;
    }
  }
}
