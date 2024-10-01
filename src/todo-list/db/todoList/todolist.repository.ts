import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, RootFilterQuery, UpdateQuery } from "mongoose";
import { BaseEntityRepository } from "../../../common/database/base-entity.repository";
import { TodoList } from "../../entities/todoList/Todolist";
import { TodoListSchema } from "./todolist.schema";
import { TodoListSchemaFactory } from "./todolist.schema.factory";
 
    
@Injectable()
export class TodoListRepository extends BaseEntityRepository<TodoListSchema, TodoList> {
    constructor(
        @InjectModel(TodoListSchema.name) TodoListModel: Model<TodoListSchema>,
        todoListSchemaFactory: TodoListSchemaFactory
    ) {
        super(TodoListModel, todoListSchemaFactory)
    }

    
}