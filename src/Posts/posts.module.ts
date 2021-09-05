import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import CategoriesEntity from "./Entities/category.entity";
import PostsController from "./posts.controller";
import PostsEntity from "./Entities/posts.entity";
import PostsService from "./posts.service";
import ImagesEntity from "./Entities/images.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsEntity, CategoriesEntity, ImagesEntity]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export default class PostsModule {}
