import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import UserService from "src/User/user.service";

@Injectable()
export default class AdminMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.token;

    if (typeof token === undefined) {
      res.status(403).send({
        message: "Forbidden",
        statusCode: 403,
      });
    } else {
      this.userService
        //@ts-ignore
        .verifyToken(token)
        .then((result: any) => {
          if (result.role === "ADMIN") {
            return next();
          }
          res.status(403).send({
            message: "Forbidden",
            statusCode: 403,
          });
        })
        .catch((err) => {
          res.status(403).send({
            message: "Forbidden",
            statusCode: 403,
            error: err,
          });
        });
    }
  }
}
