import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import PostsService from "src/Posts/posts.service";
import AdminDto from "./dto/admin.dto";
import { Response } from "express";
import multer from "multer";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("admin")
export default class AdminController {
  constructor(private postService: PostsService) {}

  @Post("create")
  @UseInterceptors(FileInterceptor("files"))
  createPost(
    @Body() props: AdminDto,
    @Res() res: Response,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    this.postService.create(props).then(({ raw }) => {
      const postId = raw.insertId || null;
      if (postId === null) {
        return res.status(400).send({
          statusCode: 400,
          message: "Nie udało się utworzyć postu",
        });
      }
      this.postService.insertImages(props.images, postId);
      this.postService.insertCategories(props.categories, postId);
    });
  }
}
