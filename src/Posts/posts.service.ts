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
    return this.postRepository.findOne({
      where: [{ id }],
      relations: ["categories", "images"],
    });
  }

  getPremiumPosts() {
    return this.postRepository.find({
      relations: ["categories", "images"],
      where: [{ needAccount: true }],
    });
  }

  create(props: any) {
    const created_at = new Date().toLocaleDateString();
    return this.postRepository.insert({
      ...props,
      created_at,
      edited_at: created_at,
      thumbnail: "",
    });
  }

  insertImages(images: string[], id: number) {
    images.forEach((image) => {
      this.imagesRepository.insert({ post_id: id, name: image });
    });
  }
  insertSingleImage(name: string, original_name: string, id: number) {
    return this.imagesRepository.insert({ post_id: id, name, original_name });
  }

  insertCategories(categories: string[], id: number) {
    categories.forEach((cat) => {
      this.catRepository.insert({ post_id: id, category: cat });
    });
  }
}
