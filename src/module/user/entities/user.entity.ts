import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  @IsString()
  username: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsString()
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
