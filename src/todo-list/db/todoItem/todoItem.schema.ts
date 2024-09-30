import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaType, SchemaTypes } from "mongoose";
import { ObjectId } from "mongodb";
import { IdentifiableEntitySchema } from "src/common/database/identifiable-entity.schema";

@Schema({ versionKey: false, collection: "todoItems" })
export class TodoItemSchema extends IdentifiableEntitySchema {
    @Prop({
        type : SchemaTypes.ObjectId,
    })
    todoListId : ObjectId
    
    @Prop({
        type : SchemaTypes.String,
    })
    title : string
    
    @Prop({
        type : SchemaTypes.String,
    })
    description : string
    
    @Prop({
        type : SchemaTypes.Number,
    })
    priority : number
    
 
}