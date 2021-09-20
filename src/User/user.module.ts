import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserController from "./user.controller";
import UserEntity from "./user.entity";
import UserService from "./user.service";

@Module({
  imports: [
    ThrottlerModule.forRoot({ ttl: 60, limit: 5 }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export default class UserModule {}
