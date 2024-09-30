import { Injectable } from "@nestjs/common";
import { EntityFactory } from "src/common/database/entity.factory";
import { Types } from "mongoose";
import { TodoList } from "./Todolist";
import { TodoListRepository } from "src/todo-list/db/todoList/todolist.repository";


@Injectable()
export class TodoListFactory implements EntityFactory<TodoList> {
    constructor(private readonly todoListRepository: TodoListRepository) { }
    
    async create(title: string, userId: string): Promise<TodoList> {
        const todoList = new TodoList(new Types.ObjectId().toString(), title, new Types.ObjectId(userId).toString())
        await this.todoListRepository.create(todoList)

        // TODO event

        return todoList
    }
}