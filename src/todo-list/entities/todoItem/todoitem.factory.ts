import { Injectable } from "@nestjs/common";
import { EntityFactory } from "../../../common/database/entity.factory";
import { Types } from "mongoose";
import { TodoItem } from "./TodoItem";
import { TodoItemRepository } from "../../../todo-list/db/todoItem/todoitem.repository";
import { TodoItemLogEvent } from "../../../todo-list/events/todoItem-logger/todoItem.event";
import { EventType } from "../../../common/enums/event-type.enum";


@Injectable()
export class TodoItemFactory implements EntityFactory<TodoItem> {
    constructor(private readonly TodoItemRepository: TodoItemRepository) { }
    async create(title: string, description: string, priority: number, todoListItem: string): Promise<TodoItem> {
        const todoItem = new TodoItem(new Types.ObjectId().toString(), new Types.ObjectId(todoListItem).toString(), title, description, priority)
        await this.TodoItemRepository.create(todoItem)

        todoItem.apply(new TodoItemLogEvent(EventType.CREATE,todoItem))

        return todoItem
    }
}