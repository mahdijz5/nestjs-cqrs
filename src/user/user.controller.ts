import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { LoginReqDto, RegisterReqDto } from './dto';
import { RegisterUserCommand } from './commands/register-user/register-user-command';
import { LoginUserQuery } from './queries/login-user/login-user-query';
import { JWTGuard } from '../common/guards';

@Controller('user')
export class UserController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @ApiProperty({})
    @Post("register")
    async register(@Body() registerReqDto: RegisterReqDto): Promise<void> {
        return await this.commandBus.execute<RegisterUserCommand, void>(new RegisterUserCommand(registerReqDto))
    }

    @ApiProperty({})
    @Post("login")
    async login(@Body() loginReqDto: LoginReqDto): Promise<void> {
        return await this.queryBus.execute<LoginUserQuery, void>(new LoginUserQuery(loginReqDto))
    }

    @ApiBearerAuth()
    @ApiProperty({})
    @UseGuards(JWTGuard)
    @Post("validate")
    async validate( ): Promise<void> {
        return 
    }
}
