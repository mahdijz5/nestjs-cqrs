import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { IdentifiableEntitySchema } from "src/common/database/identifiable-entity.schema";

@Schema({ versionKey: false, collection: "users" })
export class UserSchema extends IdentifiableEntitySchema {
    @Prop({
        type : SchemaTypes.String,
        unique :true
    })
    username : string
    
    @Prop({
        type : SchemaTypes.String,
    })
    password : string
 
}