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

  public all(): Promise<any> {
    return this.postRepository.find({
      relations: ["categories", "images", "files"],
      where: [{ published: true, needAccount: false }],
      order: { created_at: "DESC" },
    });
  }

  public byId(id: number): Promise<any> {
    return this.postRepository.findOne({
      where: [{ id, published: true }],
      relations: ["categories", "images", "files"],
    });
  }

  public getPremiumPosts(): Promise<any> {
    return this.postRepository.find({
      relations: ["categories", "images", "files"],
      where: [{ needAccount: true, published: true }],
    });
  }

  public create(props: any): Promise<any> {
    const created_at = new Date().toLocaleTimeString();
    return this.postRepository.insert({
      ...props,
      created_at,
      edited_at: created_at,
      published: props.published,
      needAccount: props.premium,
    });
  }

  public insertImages(images: string[], id: number) {
    images.forEach((image) => {
      this.imagesRepository.insert({ post_id: id, name: image });
    });
  }
  public insertSingleImage(
    name: string,
    original_name: string,
    id: number
  ): Promise<any> {
    return this.imagesRepository.insert({ post_id: id, name, original_name });
  }

  insertCategories(categories: string[], id: number) {
    categories.forEach((cat) => {
      this.catRepository.insert({ post_id: id, category: cat });
    });
  }

  public getByText(text: string): Promise<any> {
    return this.postRepository.find({
      relations: ["categories", "images", "files"],
      where: [{ title: Like(`%${text}%`) }],
    });
  }

  public insertSingleFile(name: string, id: number): Promise<any> {
    return this.filesRepository.insert({ post_id: id, name });
  }

  public removePost(id: number): Promise<any> {
    return this.postRepository.delete({ id });
  }

  public publishPost(id: number): Promise<any> {
    return this.postRepository.update(id, { published: true });
  }

  public getAll(): Promise<any> {
    return this.postRepository.find({
      relations: ["categories", "images", "files"],
      order: { created_at: "DESC" },
    });
  }

  public unpublish(id: number): Promise<any> {
    return this.postRepository.update(id, { published: false });
  }

  public getUnpublished(id: number) {
    return this.postRepository.findOne(id);
  }
}
