import { Injectable } from "@nestjs/common";
import { EntityFactory } from "../../../common/database/entity.factory";
import { Types } from "mongoose";
import { TodoList } from "./Todolist";
import { TodoListRepository } from "../../../todo-list/db/todoList/todolist.repository";
import { TodoListLogEvent } from "../../../todo-list/events/todolist-logger/todolist.event";
import { EventType } from "../../../common/enums/event-type.enum";


@Injectable()
export class TodoListFactory implements EntityFactory<TodoList> {
    constructor(private readonly todoListRepository: TodoListRepository) { }
    
    async create(title: string, userId: string): Promise<TodoList> {
        const todoList = new TodoList(new Types.ObjectId().toString(), title, new Types.ObjectId(userId).toString())
        await this.todoListRepository.create(todoList)

        todoList.apply(new TodoListLogEvent(EventType.CREATE,todoList))

        return todoList
    }
}