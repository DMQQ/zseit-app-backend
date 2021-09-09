import { Controller, Get, Param, Res } from "@nestjs/common";
import PostsService from "./posts.service";
import { Response } from "express";

@Controller("posts")
export default class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.all();
  }

  @Get("/search=:text")
  searchByText(@Param("text") text: string) {
    return this.postsService.getByText(text);
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
    return response.sendFile(name, { root: "./images" });
  }
}
