import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { LoginReqDto } from "src/user/dto";
import { LoginResDto } from "src/user/dto/login-res.dto";
import { comparePassword } from "src/user/utils/hash.utils";
import { BadRequestException } from "@nestjs/common";
import { ERROR } from "src/common/enums";
import { JwtService } from "@nestjs/jwt";
import { JwtDataInterface } from "src/common/interfaces/jwt-interface";
import { FindAllTodoListQuery } from "./findAll-todolist.query";
import { TodoListRepository } from "src/todo-list/db";
import { Types } from "mongoose";
import { TodoList } from "src/todo-list/entities/todoList/Todolist";

@QueryHandler(FindAllTodoListQuery)
export class FindALltodoListHandler implements IQueryHandler<FindAllTodoListQuery> {
    constructor(private readonly todoListRepository: TodoListRepository) { }

    async execute({ userId }: FindAllTodoListQuery): Promise<TodoList[]> {
        const todolists = await this.todoListRepository.findAll({ userId: new Types.ObjectId(userId) })


        return todolists
    }

  

}