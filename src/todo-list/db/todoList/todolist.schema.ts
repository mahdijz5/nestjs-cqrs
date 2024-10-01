import { Prop, Schema } from "@nestjs/mongoose";
import {  SchemaType, SchemaTypes } from "mongoose";
import { IdentifiableEntitySchema } from "../../../common/database/identifiable-entity.schema";
import { ObjectId } from 'mongodb';

@Schema({ versionKey: false, collection: "todoLists" })
export class TodoListSchema extends IdentifiableEntitySchema {
    @Prop({
        type : SchemaTypes.String,
     })
    title : string
    
    @Prop({
        type : SchemaTypes.ObjectId,
    })
    userId : ObjectId
 
}