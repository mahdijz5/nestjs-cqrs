import { Injectable } from "@nestjs/common";
import { EntitySchemaFactory } from "src/common/database/entity-schema.factory";
import { Types } from "mongoose";
import { TodoItemSchema } from "./todoItem.schema";
import { TodoItem } from "src/todo-list/entities/todoItem/TodoItem";

@Injectable()
export class TodoItemSchemaFactory implements EntitySchemaFactory<TodoItemSchema, TodoItem> {
    create(entity: TodoItem): TodoItemSchema {
        return {
            _id: new Types.ObjectId(entity.getID),
            title: entity.getTitle,
            todoListId: new Types.ObjectId(entity.getTodolistId),
            description: entity.getDescription,
            priority: entity.getPriority
        }
    }

    createFromSchema(entitySchema: TodoItemSchema): TodoItem {
        return new TodoItem(entitySchema._id.toString(), entitySchema.todoListId.toString(), entitySchema.title, entitySchema.description, entitySchema.priority)
    }
}