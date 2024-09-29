import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
 import { BaseEntityRepository } from "src/common/database/base-entity.repository";
import { UserSchema } from "./user.schema";
import { User } from "../User";
import { UserSchemaFactory } from "./user.schema.factory";
 
@Injectable()
export class UserRepository extends BaseEntityRepository<UserSchema, User> {
    constructor(
        @InjectModel(UserSchema.name) UserModel: Model<UserSchema>,
        UserSchemaFactory: UserSchemaFactory
    ) {
        super(UserModel,UserSchemaFactory)
    }
}