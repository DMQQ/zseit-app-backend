import { Body, Controller, Post, Res } from "@nestjs/common";
import { UserDto } from "./dto/userDto";
import UserService from "./user.service";
import { Response } from "express";

@Controller("auth")
export default class UserController {
  constructor(private userService: UserService) {}

  @Post("/login")
  login(@Body() props: UserDto, @Res() response: Response) {
    this.userService.findUser(props.email).then((result) => {
      if (typeof result === "undefined") {
        return response.status(400).send({
          statusCode: 400,
          message: "Użytkownik z takim e-mailem nie istnieje",
          error: "Bad Request",
        });
      }
      this.userService
        .comparePassword(props.password, result.password)
        .then((isValid) => {
          if (!isValid) {
            return response.status(400).send({
              error: "Bad Request",
              statusCode: 400,
              message: "Email lub hasło nie pasuje",
            });
          }
          this.userService
            .createToken({
              username: props.email,
              user_id: result.id,
              role: result.role,
            })
            .then((token) => {
              if (token) {
                response.status(200).send({
                  message: "Zalogowano pomyślnie",
                  user_id: result.id,
                  username: props.email,
                  token,
                  role: result.role,
                });
              }
            });
        });
    });
  }

  @Post("/register")
  register(@Body() props: UserDto, @Res() response: Response) {
    this.userService.findUser(props.email).then((result) => {
      if (typeof result !== "undefined") {
        return response.status(400).send({
          statusCode: 400,
          message: "Nazwa użytkownika jest niedostępna",
          error: "Bad Request",
        });
      }
      this.userService.hashPassword(props.password).then((hashed) => {
        if (hashed) {
          this.userService
            .createUser({
              username: props.email,
              password: hashed,
            })
            .then(({ raw }) => {
              if (!raw) {
                return response.status(400).send({
                  statusCode: 400,
                  message: "Creating user failed",
                  error: "Failed",
                });
              }

              this.userService
                .createToken({
                  username: props.email,
                  user_id: raw.insertId,
                  role: "USER",
                })
                .then((token) => {
                  response.status(201).send({
                    message: "Konto utworzone pomyślnie",
                    username: props.email,
                    user_id: raw.insertId,
                    token,
                    role: "USER",
                  });
                });
            });
        }
      });
    });
  }
}
