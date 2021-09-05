import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum User {
  "ADMIN",
  "USER",
  "CREATOR",
}

@Entity("user")
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  password: string;

  @Column({ type: "varchar", nullable: false, length: 30 })
  username: string;

  @Column({ type: "varchar" })
  role: User;

  @Column({ type: "date" })
  created_at: Date;

  @Column({ type: "boolean" })
  blocked: boolean;
}
