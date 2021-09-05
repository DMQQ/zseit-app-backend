import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import PostsEntity from "./posts.entity";

@Entity("images")
export default class ImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @ManyToOne(() => PostsEntity, (type) => type.id)
  @JoinColumn({ name: "post_id" })
  post_id: number;
}
