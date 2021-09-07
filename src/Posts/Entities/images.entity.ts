import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import PostsEntity from "./posts.entity";

@Entity("images")
export default class ImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  original_name: string;

  @ManyToOne(() => PostsEntity)
  @JoinColumn({ name: "post_id" })
  post_id: number;
}
