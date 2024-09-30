import { Injectable } from "@nestjs/common";
import { EntityFactory } from "src/common/database/entity.factory";
import { Types } from "mongoose";
import { TodoItem } from "./TodoItem";
import { TodoItemRepository } from "src/todo-list/db/todoItem/todoitem.repository";


@Injectable()
export class TodoItemFactory implements EntityFactory<TodoItem> {
    constructor(private readonly TodoItemRepository: TodoItemRepository) { }
    async create(title: string, description: string, priority: number, todoListItem: string): Promise<TodoItem> {
        const todoItem = new TodoItem(new Types.ObjectId().toHexString(), new Types.ObjectId().toHexString(), title, description, priority)
        await this.TodoItemRepository.create(todoItem)

        // TODO event

        return todoItem
    }
}