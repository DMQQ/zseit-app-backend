import { Controller, Put, Res, Body, Get } from "@nestjs/common";
import { Response } from "express";
import UserService from "src/User/user.service";

@Controller("admin/user")
export default class AdminUserController {
  constructor(private userService: UserService) {}

  @Put("/users/block")
  async blockUser(@Body("id") id: number, @Res() response: Response) {
    return this.userService
      .block(id)
      .then(({ affected }) => {
        if (typeof affected !== "undefined" && affected > 0) {
          return response.send({ message: "Blocked" });
        }
        response.send({ message: "Failed" });
      })
      .catch((err) => {
        response.send(err);
      });
  }

  @Get()
  getAllUsers() {
    return this.userService.getAll();
  }
}
