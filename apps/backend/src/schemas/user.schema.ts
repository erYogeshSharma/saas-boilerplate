import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export enum Role {
  User = 'user',
  Admin = 'admin',
  SuperAdmin = 'superadmin',
}
@Schema({ timestamps: true }) // Enable timestamps
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Role, default: Role.User })
  role: Role;

  @Prop({ type: Types.ObjectId, ref: 'Organization' })
  organization: Types.ObjectId;

  @Prop()
  resetPasswordLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
