import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTodoListReqDto } from './dto';
import { JWTData } from '../common/decorators';
import { JwtDataInterface } from '../common/interfaces/jwt-interface';
import { JWTGuard } from '../common/guards';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './commands/create-todolist/create-todolist.command';
import { UpdateTodoListReqDto } from './dto/update-todolist-req.dto';
import { UpdateTodoListCommand } from './commands/update-todolist/update-todolist.command';
import { RemoveTodoListCommand } from './commands/remove-todolist/remove-todolist.command';
import { FindAllTodoListQuery } from './queries/findAll-todolist/findAll-todolist.query';

@ApiTags("todo-list")
@ApiBearerAuth()
@UseGuards(JWTGuard)
@Controller({ path: 'todo-list', version: '1' })
export class TodoListController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Get()
    async findAll(  @JWTData() data: JwtDataInterface) {
        return await this.queryBus.execute<FindAllTodoListQuery, void>(new FindAllTodoListQuery(data.id))
    }

    @Post()
    async create(@Body() createTodoListDto: CreateTodoListReqDto, @JWTData() data: JwtDataInterface) {
        await this.commandBus.execute<CreateTodoListCommand, void>(new CreateTodoListCommand({ ...createTodoListDto, userId: data.id }))
    }

    @Patch(":id")
    async update(@Body() updateTodoListDto: UpdateTodoListReqDto, @Param("id") id: string) {
        await this.commandBus.execute<UpdateTodoListCommand, void>(new UpdateTodoListCommand(id, { ...updateTodoListDto }))
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.commandBus.execute<RemoveTodoListCommand, void>(new RemoveTodoListCommand(id))
    }
}
