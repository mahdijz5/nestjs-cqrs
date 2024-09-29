import { Injectable } from "@nestjs/common";
import { EntityFactory } from "src/common/database/entity.factory";
import { Types } from "mongoose";
import { User } from "./User";
import { UserRepository } from "./db/user.repository";
import { hashPassword } from "./utils/hash.utils";

@Injectable()
export class UserFactory implements EntityFactory<User> {
    constructor(private readonly userRepository: UserRepository) { }
    async create(username: string, password: string): Promise<User> {
        const hashedPassword = await hashPassword(password)
        const user = new User(
            new Types.ObjectId().toHexString(),
            username,
            hashedPassword
        )

        await this.userRepository.create(user)

        // TODO apply event 

        return user
    }
}