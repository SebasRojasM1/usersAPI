import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty()
  @Prop({ required: true })
  @IsString()
  name: string;

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
