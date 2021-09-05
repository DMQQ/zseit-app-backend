import UserEntity from "src/User/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import CategoriesEntity from "./category.entity";
import ImagesEntity from "./images.entity";

@Entity("posts")
export default class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "text", nullable: false })
  content: string;

  @OneToMany(() => UserEntity, (type) => type.id)
  @JoinColumn({ name: "author_id" })
  author_id: UserEntity;

  @Column({ type: "date" })
  created_at: Date;

  @OneToMany(() => CategoriesEntity, (type) => type.post_id)
  @JoinColumn({ name: "categories" })
  categories: CategoriesEntity[];

  @OneToMany(() => ImagesEntity, (type) => type.post_id)
  @JoinColumn({ name: "images" })
  images: ImagesEntity[];

  @Column({ type: "boolean" })
  needAccount: boolean;

  @Column({ type: "varchar" })
  thumbnail: string;

  @Column({ type: "boolean" })
  published: boolean;

  @Column({ type: "date" })
  edited_at: Date;
}
