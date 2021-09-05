import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import PostsModule from "src/Posts/posts.module";
import AdminController from "./admin.controller";

@Module({
  imports: [
    PostsModule,
    MulterModule.register({
      dest: "./images",
    }),
  ],
  controllers: [AdminController],
})
export default class AdminModule {}
