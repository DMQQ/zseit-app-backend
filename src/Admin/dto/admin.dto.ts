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

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsArray()
  categories: string[];

  @IsArray()
  images: string[];
}
