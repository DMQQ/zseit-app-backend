import { Controller } from "@nestjs/common";
import PostsService from "src/Posts/posts.service";

@Controller("admin")
export default class AdminController {
  constructor(private postService: PostsService) {}
}
