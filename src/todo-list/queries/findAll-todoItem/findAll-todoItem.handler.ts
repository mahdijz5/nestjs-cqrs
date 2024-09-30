import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TodoItemRepository, TodoListRepository } from "src/todo-list/db";
import { Types } from "mongoose";
import { FindAllTodoItemQuery } from "./findAll-todoItem.query";
import { TodoItem } from "src/todo-list/entities/todoItem/TodoItem";

@QueryHandler(FindAllTodoItemQuery)
export class FindAllTodoitemHandler implements IQueryHandler<FindAllTodoItemQuery> {
    constructor(private readonly todoItemRepository: TodoItemRepository) { }

    async execute({ todoListId }: FindAllTodoItemQuery): Promise<TodoItem[]> {
        const todoItems = await this.todoItemRepository.findAll({ todoListId: new Types.ObjectId(todoListId) },{priority :  1})


        return todoItems
    }



}