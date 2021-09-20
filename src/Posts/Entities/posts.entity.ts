import UserEntity from "src/User/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import CategoriesEntity from "./category.entity";
import FilesEntity from "./files.entity";
import ImagesEntity from "./images.entity";

@Entity("posts")
export default class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false, length: "100" })
  title: string;

  @Column({ type: "text", nullable: false })
  content: string;

  @OneToMany(() => UserEntity, (type) => type.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "author_id" })
  author_id: UserEntity;

  @OneToMany(() => CategoriesEntity, (type) => type.post_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "categories" })
  categories: CategoriesEntity[];

  @OneToMany(() => ImagesEntity, (type) => type.post_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "images" })
  images: ImagesEntity[];

  @Column({ type: "boolean" })
  needAccount: boolean;

  @Column({ type: "boolean" })
  published: boolean;

  @Column({ type: "varchar" })
  created_at: string;

  @Column({ type: "varchar" })
  edited_at: string;

  @Column({ type: "varchar", length: "250" })
  description: string;

  @OneToMany(() => FilesEntity, (type) => type.post_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "files" })
  files: FilesEntity[];
}
