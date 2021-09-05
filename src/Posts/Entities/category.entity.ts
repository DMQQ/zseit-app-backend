import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import PostsEntity from "./posts.entity";

@Entity("categories")
export default class CategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostsEntity, (type) => type.id)
  @JoinColumn({ name: "post_id" })
  post_id: number;

  @Column({ type: "varchar" })
  category: string;
}
