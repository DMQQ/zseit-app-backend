import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import PostsEntity from "./posts.entity";

@Entity("files")
export default class FilesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @ManyToOne(() => PostsEntity, (type) => type.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "post_id" })
  post_id: number;
}
