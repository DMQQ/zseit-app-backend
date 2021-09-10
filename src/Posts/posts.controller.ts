import { Controller, Get, Param, Res } from "@nestjs/common";
import PostsService from "./posts.service";
import { Response } from "express";
import { createReadStream } from "fs";
import { join } from "path";

@Controller("posts")
export default class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.all();
  }

  @Get("/search=:text/category=:cat")
  searchByText(@Param("text") text: string, @Param("cat") category: string) {
    return text === "ALL"
      ? this.postsService.all()
      : this.postsService.getByText(text);
  }

  @Get("/postId=:id")
  getPostById(@Param("id") id: number) {
    return this.postsService.byId(id);
  }

  @Get("/user-only")
  getPostForAuthenticated() {
    return this.postsService.getPremiumPosts();
  }

  @Get("/images/name=:name")
  readImages(@Param("name") name: string, @Res() response: Response) {
    return response.sendFile(name, { root: "./files" });
  }

  @Get("files/name=:name")
  getFiles(@Param("name") name: string, @Res() response: Response) {
    const file = createReadStream(join(process.cwd(), `./files/${name}`));

    return file.pipe(response);
  }
}
