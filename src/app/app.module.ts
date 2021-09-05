import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import AdminModule from "src/Admin/admin.module";
import PostsModule from "src/Posts/posts.module";
import UserModule from "src/User/user.module";

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, PostsModule, AdminModule],
})
export class AppModule {}
