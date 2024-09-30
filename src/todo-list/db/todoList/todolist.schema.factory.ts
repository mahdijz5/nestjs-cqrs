import { Injectable } from "@nestjs/common";
import { EntitySchemaFactory } from "src/common/database/entity-schema.factory";
import { ObjectId, Types } from "mongoose";
import { TodoListSchema } from "./todolist.schema";
import { TodoList } from "src/todo-list/entities/todoList/Todolist";

@Injectable()
export class TodoListSchemaFactory implements EntitySchemaFactory<TodoListSchema, TodoList> {
    create(entity: TodoList): TodoListSchema {
        return {
            _id: new Types.ObjectId(entity.getID),
            title : entity.getTitle,
            userId : new Types.ObjectId(entity.getUserId)
        }
    }

    createFromSchema(entitySchema: TodoListSchema): TodoList {
        return new TodoList(entitySchema._id.toString(),entitySchema.title,entitySchema.userId.toString())
    }
}