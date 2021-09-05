import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CategoriesEntity from "./Entities/category.entity";
import ImagesEntity from "./Entities/images.entity";
import PostsEntity from "./Entities/posts.entity";

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private postRepository: Repository<PostsEntity>,

    @InjectRepository(CategoriesEntity)
    private catRepository: Repository<CategoriesEntity>,

    @InjectRepository(ImagesEntity)
    private imagesRepository: Repository<ImagesEntity>
  ) {}

  all() {
    return this.postRepository.find({ relations: ["categories", "images"] });
  }
  byId(id: number) {
    return this.postRepository.findOne({ where: [{ id }] });
  }
}
