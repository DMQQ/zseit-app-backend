import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import UserEntity from "./user.entity";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";

export const TOKEN = process.env.TOKEN || "nn41n4198ganxnz!!xc(()23131";

type InsertProps = {
  username: string;
  password: string;
};

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }

  async createToken(props: any) {
    return jwt.sign(props, TOKEN, { expiresIn: "720h" });
  }

  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, TOKEN);
  }

  async findUser(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ username, blocked: false });
  }

  async createUser(props: InsertProps) {
    const date = new Date();

    const [day, month, year] = [
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
    ];

    return this.userRepository.insert({
      ...props,
      created_at: `${year}-${month}-${day}`,
    });
  }

  async isBlocked(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ username, blocked: true });
  }

  block(id: number) {
    return this.userRepository.update(id, { blocked: true });
  }
}
