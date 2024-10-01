import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { LoginReqDto } from "../../../user/dto";
import { LoginResDto } from "../../../user/dto/login-res.dto";
import { comparePassword } from "../../../user/utils/hash.utils";
import { BadRequestException } from "@nestjs/common";
import { ERROR } from "../../../common/enums";
import { JwtService } from "@nestjs/jwt";
import { JwtDataInterface } from "../../../common/interfaces/jwt-interface";
import { FindAllTodoListQuery } from "./findAll-todolist.query";
import { TodoListRepository } from "../../../todo-list/db";
import { Types } from "mongoose";
import { TodoList } from "../../../todo-list/entities/todoList/Todolist";

@QueryHandler(FindAllTodoListQuery)
export class FindALltodoListHandler implements IQueryHandler<FindAllTodoListQuery> {
    constructor(private readonly todoListRepository: TodoListRepository) { }

    async execute({ userId }: FindAllTodoListQuery): Promise<TodoList[]> {
        const todolists = await this.todoListRepository.findAll({ userId: new Types.ObjectId(userId) })


        return todolists
    }

  

}