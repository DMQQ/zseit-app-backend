import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Res,
  UploadedFiles,
} from "@nestjs/common";
import PostsService from "src/Posts/posts.service";
import AdminDto from "./dto/admin.dto";
import { Response } from "express";
import { UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("admin")
export default class AdminController {
  constructor(private postService: PostsService) {}

  @Post("create")
  createPost(@Body() props: AdminDto, @Res() res: Response) {
    this.postService.create(props).then(({ raw }) => {
      const postId = raw.insertId || null;
      if (postId === null) {
        return res.status(400).send({
          statusCode: 400,
          message: "Nie udało się utworzyć postu",
        });
      }
      this.postService.insertCategories(props.categories, postId);

      res.status(201).send({
        message: "Success",
        insertId: postId,
      });
    });
  }

  @Post("upload/id=:id")
  @UseInterceptors(FilesInterceptor("images"))
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param("id") id: number,
    @Res() res: Response
  ) {
    if (files !== null) {
      const names = files.map(({ filename }) => filename);
      files.forEach(({ filename, originalname }) => {
        this.postService
          .insertSingleImage(filename, originalname, +id)
          .then(({ raw: { affectedRows } }) => {
            if (typeof affectedRows !== "undefined" && affectedRows > 0) {
              return res
                .status(201)
                .send({ message: "Uploaded", images: names });
            }
          })
          .catch((err) => {
            res.status(400).send({
              message: "Failed",
              error: err,
            });
          });
      });
    }
  }

  @Post("/upload/files/id=:id")
  @UseInterceptors(FilesInterceptor("files"))
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param("id") id: number,
    @Res() res: Response
  ) {
    if (files !== null) {
      const names = files.map(({ filename }) => filename);

      files.forEach(({ filename }) => {
        this.postService
          .insertSingleFile(filename, id)
          .then(({ raw: { affectedRows } }) => {
            if (typeof affectedRows !== "undefined" && affectedRows > 0) {
              return res
                .status(201)
                .send({ message: "Uploaded", images: names });
            }
          })
          .catch((err) => {
            res.status(400).send({
              message: "Failed",
              error: err,
            });
          });
      });
    }
  }

  @Delete("/delete/post")
  async removePost(@Body("id") id: number, @Res() response: Response) {
    return this.postService.removePost(id).then((result) => {
      if (result.affected > 0) {
        return response.send({ message: "Deleted" });
      }
      response.send({ message: "Failed" });
    });
  }

  @Put("/update/publish")
  async publishPost(@Body("id") id: number, @Res() response: Response) {
    return this.postService.publishPost(id).then((res) => {
      if (res.affected > 0) {
        return response.send({ message: "Updated" });
      }
    });
  }
}
