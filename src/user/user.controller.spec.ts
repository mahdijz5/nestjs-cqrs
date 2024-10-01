import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterReqDto, LoginReqDto } from './dto';
import { RegisterUserCommand } from './commands/register-user/register-user-command';
import { LoginUserQuery } from './queries/login-user/login-user-query';

describe('UserController', () => {
    let controller: UserController;
    let commandBus: CommandBus;
    let queryBus: QueryBus;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: CommandBus,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: QueryBus,
                    useValue: { execute: jest.fn() },
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        commandBus = module.get<CommandBus>(CommandBus);
        queryBus = module.get<QueryBus>(QueryBus);
    });

    describe('register', () => {
        it('should call commandBus.execute with RegisterUserCommand', async () => {
            const registerDto: RegisterReqDto = { username: 'user', password: 'pass' };  
            const command = new RegisterUserCommand(registerDto);

            await controller.register(registerDto);

            expect(commandBus.execute).toHaveBeenCalledWith(command);
        });
    });

    describe('login', () => {
        it('should call queryBus.execute with LoginUserQuery', async () => {
            const loginDto: LoginReqDto = { username: 'user', password: 'pass' }; 
            const query = new LoginUserQuery(loginDto);

            await controller.login(loginDto);

            expect(queryBus.execute).toHaveBeenCalledWith(query);
        });
    });

    describe('validate', () => {
        it('should return void', async () => {
            const result = await controller.validate();
            expect(result).toBeUndefined();
        });
    });
});
