import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../User';
import { UserRepository } from '../../../user/db/user.repository';
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginUserHandler } from './login-user-handler';
import { LoginUserQuery } from './login-user-query';
import { comparePassword } from '../../../user/utils/hash.utils';
import { BadRequestException } from '@nestjs/common';
import { ERROR } from '../../../common/enums';

jest.mock('../../../user/utils/hash.utils');
const mockUserData = new User(new Types.ObjectId().toString(), "username", "password")
const mockToken = 'mockToken'
describe('LoginUserHandler', () => {
    let userRepository: UserRepository;
    let jwtService: JwtService;
    let handler: LoginUserHandler;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LoginUserHandler,
                {
                    provide: UserRepository,
                    useValue: {
                        findOneByCondition: jest.fn().mockResolvedValue(mockUserData),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockImplementation((input) => mockToken)

                    }
                },
            ],
        }).compile();

        handler = module.get<LoginUserHandler>(LoginUserHandler);
        userRepository = module.get<UserRepository>(UserRepository);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('Should successfully login and return a token.', async () => {
        const loginUserReq = { username: mockUserData.getUsername, password: mockUserData.getPassword };

        (comparePassword as jest.Mock).mockResolvedValue(true);
        (jwtService.sign as jest.Mock).mockReturnValue(mockToken);

        const query = new LoginUserQuery({ ...loginUserReq, password: "password" });
        const result = await handler.execute(query)

        expect(userRepository.findOneByCondition).toHaveBeenCalledWith({ username: mockUserData.getUsername });
        expect(comparePassword).toHaveBeenCalledWith('password', mockUserData.getPassword);
        expect(jwtService.sign).toHaveBeenCalledWith({ id: mockUserData.getID, username: mockUserData.getUsername });
        expect(result).toEqual({ token: mockToken });

    });

    it('should throw BadRequestException if user not found', async () => {
        const loginUserReq = { username: mockUserData.getUsername, password: mockUserData.getPassword };

        (userRepository.findOneByCondition as jest.Mock).mockResolvedValue(null);

        await expect(handler.execute(new LoginUserQuery({ password : loginUserReq.password, username : loginUserReq.username })))
            .rejects
            .toThrow(new BadRequestException(ERROR.INVALID_CREDENTIALS));
    });

    it('should throw BadRequestException if password does not match', async () => {
        const loginUserReq = { username: mockUserData.getUsername, password: mockUserData.getPassword };
        (comparePassword as jest.Mock).mockResolvedValue(false);

        await expect(handler.execute(new LoginUserQuery({ password : loginUserReq.password, username : loginUserReq.username })))
            .rejects
            .toThrow(new BadRequestException(ERROR.INVALID_CREDENTIALS));
    });

});
