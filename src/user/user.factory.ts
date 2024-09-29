import { Injectable } from "@nestjs/common";
import { EntityFactory } from "src/common/database/entity.factory";
import { Types } from "mongoose";
import { User } from "./User";
import { UserRepository } from "./db/user.repository";
import { hashPassword } from "./utils/hash.utils";
import { UserRegisterEvent } from "./events/register-user/register-user-event";

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

        user.apply(new UserRegisterEvent({ id: user.getID, username: user.getUsername, timestamp: new Date(), email: "test@email.com" }))


        return user
    }
}