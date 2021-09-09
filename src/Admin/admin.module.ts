import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import PostsModule from "src/Posts/posts.module";
import UserModule from "src/User/user.module";
import AdminController from "./admin.controller";
import AdminMiddleware from "./middleware/admin.middleware";

@Module({
  imports: [
    PostsModule,
    MulterModule.register({
      dest: "./files",
    }),
    UserModule,
  ],
  controllers: [AdminController],
})
export default class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes("admin");
  }
}
