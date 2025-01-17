import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema({ timestamps: true })
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  size: number;

  @Prop({ required: false })
  brandColor: string;

  @Prop({ required: false })
  logo: string;

  @Prop({ required: true })
  plan: string;

  @Prop()
  domain: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
