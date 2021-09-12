import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import CategoriesEntity from "./Entities/category.entity";
import FilesEntity from "./Entities/files.entity";
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
    private imagesRepository: Repository<ImagesEntity>,

    @InjectRepository(FilesEntity)
    private filesRepository: Repository<FilesEntity>
  ) {}

  all() {
    return this.postRepository.find({
      relations: ["categories", "images", "files"],
      where: [{ published: true, needAccount: false }],
    });
  }

  byId(id: number) {
    return this.postRepository.findOne({
      where: [{ id, published: true }],
      relations: ["categories", "images", "files"],
    });
  }

  getPremiumPosts() {
    return this.postRepository.find({
      relations: ["categories", "images", "files"],
      where: [{ needAccount: true, published: true }],
    });
  }

  create(props: any) {
    const created_at = new Date().toLocaleDateString();
    return this.postRepository.insert({
      ...props,
      created_at,
      edited_at: created_at,
      thumbnail: "",
      published: true,
      needAccount: props.premium,
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

  getByText(text: string) {
    return this.postRepository.find({
      relations: ["categories", "images", "files"],
      where: [{ title: Like(`%${text}%`) }],
    });
  }

  insertSingleFile(name: string, id: number) {
    return this.filesRepository.insert({ post_id: id, name });
  }

  removePost(id: number) {
    return this.postRepository.delete({ id });
  }

  publishPost(id: number) {
    return this.postRepository.update(id, { published: true });
  }

  getAll() {
    return this.postRepository.find({
      relations: ["categories", "images", "files"],
    });
  }
}
