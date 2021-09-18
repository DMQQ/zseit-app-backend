import { Controller, Get, Param, Req, Res } from "@nestjs/common";
import PostsService from "./posts.service";
import { Response, Request } from "express";
import { createReadStream } from "fs";
import { join } from "path";

@Controller("posts")
export default class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.all();
  }

  @Get("/search=:text/category=:category")
  async searchByText(
    @Param("text") text: string,
    @Param("category") category: string,
    @Res() response: Response
  ) {
    if (text === "ALL" && category === "NULL") {
      return this.postsService.all().then((res) => response.send(res));
    }

    if (text === "ALL" && category !== "NULL") {
      return this.postsService.all().then((result) => {
        const posts = [];

        result.forEach((post) => {
          const categories = post.categories.map(({ category }) => category);

          if (categories.includes(category)) {
            posts.push(post);
          }
        });

        response.send(posts);
      });
    }

    if (text !== "ALL" && category === "NULL") {
      return this.postsService
        .getByText(text)
        .then((result) => response.send(result));
    }

    if (text !== "ALL" && category) {
      this.postsService.getByText(text).then((result) => {
        const posts = [];

        result.forEach((post) => {
          const categories = post.categories.map(({ category }) => category);

          if (categories.includes(category)) {
            posts.push(post);
          }
        });

        response.send(posts);
      });
    }
  }

  @Get("/postId=:id")
  getPostById(@Param("id") id: number) {
    return this.postsService.byId(id);
  }

  @Get("/user-only")
  getPostForAuthenticated(@Req() request: Request) {
    const token: any = request.headers["token"];

    return token
      ? this.postsService.getPremiumPosts()
      : { message: "no token" };
  }

  @Get("/images/name=:name")
  readImages(@Param("name") name: string, @Res() response: Response) {
    return response.sendFile(name, { root: "./files" }, (err) => {
      if (err) {
        response.status(404).send({
          error: "Not found",
          statusCode: 404,
          message: err.message,
        });
      }
    });
  }

  @Get("files/name=:name")
  getFiles(@Param("name") name: string, @Res() response: Response) {
    const file = createReadStream(join(process.cwd(), `./files/${name}`)).on(
      "error",
      (err) => {
        if (err) {
          response.status(404).send({
            error: err.message,
            message: "Not found",
            statusCode: 404,
          });
        }
      }
    );

    return file.pipe(response);
  }
}
