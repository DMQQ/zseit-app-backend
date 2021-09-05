import { Module } from "@nestjs/common";
import PostsModule from "src/Posts/posts.module";
import AdminController from "./admin.controller";

@Module({
  imports: [PostsModule],
  controllers: [AdminController],
})
export default class AdminModule {}
