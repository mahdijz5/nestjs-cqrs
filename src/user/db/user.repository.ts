import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserSchema } from "./user.schema";
import { User } from "../User";
import { UserSchemaFactory } from "./user.schema.factory";
import { BaseEntityRepository } from "../../common/database/base-entity.repository";

@Injectable()
export class UserRepository extends BaseEntityRepository<UserSchema, User> {
    constructor(
        @InjectModel(UserSchema.name) UserModel: Model<UserSchema>,
        UserSchemaFactory: UserSchemaFactory
    ) {
        super(UserModel, UserSchemaFactory)
    }
}