import { IsArray, IsBoolean, IsNotEmpty, IsString } from "class-validator";

export default class AdminDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsBoolean()
  premium: boolean;

  @IsArray()
  categories: string[];

  @IsNotEmpty()
  @IsString()
  description: string;
}
