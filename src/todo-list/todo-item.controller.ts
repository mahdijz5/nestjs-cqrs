import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTData } from '../common/decorators';
import { JWTGuard } from '../common/guards';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoItemCommand } from './commands/create-todoItem/create-todoItem.command';
import { UpdateTodoItemCommand } from './commands/update-todoItem/update-todoItem.command';
import { RemoveTodoItemCommand } from './commands/remove-todoItem/remove-todoItem.command';
import { CreateTodoItemReqDto, UpdatePriorityReqDto, UpdateTodoItemReqDto } from './dto';
import { UpdatePriorityCommand } from './commands/update-priority/update-priority.command';
import { FindAllTodoItemQuery } from './queries/findAll-todoItem/findAll-todoItem.query';

@ApiTags("todo-Item")
@ApiBearerAuth()
@UseGuards(JWTGuard)
@Controller({ path: 'todo-item', version: '1' })
export class TodoItemController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Get("findAll/:todoListId")
    async findAll(@Param("todoListId") todoListId: string) {
        return await this.queryBus.execute<FindAllTodoItemQuery, void>(new FindAllTodoItemQuery(todoListId))
    }

    @Post()
    async create(@Body() createTodoItemDto: CreateTodoItemReqDto) {
        await this.commandBus.execute<CreateTodoItemCommand, void>(new CreateTodoItemCommand({ ...createTodoItemDto }))
    }

    @Patch(":id")
    async update(@Body() updateTodoItemDto: UpdateTodoItemReqDto, @Param("id") id: string) {
        await this.commandBus.execute<UpdateTodoItemCommand, void>(new UpdateTodoItemCommand(id, { ...updateTodoItemDto }))
    }

    @Patch("priority/:id")
    async updatePriority(@Body() updateTodoItemDto: UpdatePriorityReqDto, @Param("id") id: string) {
        await this.commandBus.execute<UpdatePriorityCommand, void>(new UpdatePriorityCommand(id, { ...updateTodoItemDto }))
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.commandBus.execute<RemoveTodoItemCommand, void>(new RemoveTodoItemCommand(id))
    }
}
