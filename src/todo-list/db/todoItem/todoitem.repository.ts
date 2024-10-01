import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseEntityRepository } from "../../../common/database/base-entity.repository";
import { TodoItem } from "../../entities/todoItem/TodoItem";
import {  TodoItemSchema } from "./todoItem.schema";
import { TodoItemSchemaFactory } from "./todoItem.schema.factory";
 
    
@Injectable()
export class TodoItemRepository extends BaseEntityRepository<TodoItemSchema, TodoItem> {
    constructor(
        @InjectModel(TodoItemSchema.name) TodoItemModel: Model<TodoItemSchema>,
        todoItemSchemaFactory: TodoItemSchemaFactory
    ) {
        super(TodoItemModel, todoItemSchemaFactory)
    }
}