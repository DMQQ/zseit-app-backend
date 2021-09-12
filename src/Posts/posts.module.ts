import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import CategoriesEntity from "./Entities/category.entity";
import PostsController from "./posts.controller";
import PostsEntity from "./Entities/posts.entity";
import PostsService from "./posts.service";
import ImagesEntity from "./Entities/images.entity";
import FilesEntity from "./Entities/files.entity";
import UserModule from "src/User/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostsEntity,
      CategoriesEntity,
      ImagesEntity,
      FilesEntity,
    ]),
    UserModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export default class PostsModule {}
