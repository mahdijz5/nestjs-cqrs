import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { RegisterReqDto } from './dto';
import { RegisterUserCommand } from './commands/register-user/register-user-command';

@Controller('user')
export class UserController {
    constructor(private readonly commandBus: CommandBus,private readonly queryBus : QueryBus) { }

    @ApiProperty({})
    @Post("register")
    async register(@Body() registerReqDto : RegisterReqDto) : Promise<void> {
        return await this.commandBus.execute<RegisterUserCommand,void>(new RegisterUserCommand(registerReqDto)) 
    }
}
