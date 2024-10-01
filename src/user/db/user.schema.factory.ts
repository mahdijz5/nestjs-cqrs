import { Injectable } from "@nestjs/common";
import { EntitySchemaFactory } from "../../common/database/entity-schema.factory";
 import { User } from "../User";
import { ObjectId, Types } from "mongoose";
import { UserSchema } from "./user.schema";

@Injectable()
export class UserSchemaFactory implements EntitySchemaFactory<UserSchema, User> {
    create(entity: User): UserSchema {
        return {
            _id: new Types.ObjectId(entity.getID),
            username: entity.getUsername,
            password: entity.getPassword,
        }
    }

    createFromSchema(entitySchema: UserSchema): User {
        return new User(entitySchema._id.toString(),entitySchema.username,entitySchema.password)
    }
}