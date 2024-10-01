import { Test, TestingModule } from '@nestjs/testing';
import { UserFactory } from './user.factory';
import { UserRepository } from './db/user.repository';
import { hashPassword } from './utils/hash.utils';
import { User } from './User';
import { Types } from 'mongoose';
import { UserRegisterEvent } from './events/register-user/register-user-event';

jest.mock('./utils/hash.utils');

describe('UserFactory', () => {
    let userFactory: UserFactory;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserFactory,
                {
                    provide: UserRepository,
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        userFactory = module.get<UserFactory>(UserFactory);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should create a user with hashed password and trigger event', async () => {
        const username = 'testuser';
        const email = 'test@email.com';
        const password = 'testpassword';
        const hashedPassword = 'hashedPassword';
        (hashPassword as jest.Mock).mockResolvedValue(hashedPassword);
        const createSpy = jest.spyOn(userRepository, 'create');

        const user = await userFactory.create(username, password);

        const appliedEvent = user.getUncommittedEvents();

        expect(appliedEvent).toHaveLength(1);
        
        expect(hashPassword).toHaveBeenCalledWith(password);
        expect(user.getUsername).toEqual(username);
        expect(user.getPassword).toEqual(hashedPassword);
        expect(createSpy).toHaveBeenCalledWith(user);
    });
});
