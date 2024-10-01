import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserHandler } from './register-user-handler';
import { UserFactory } from '../../user.factory';
import { EventPublisher } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user-command';
import { User } from '../../User';
import { Types } from 'mongoose';
 

const mockUserData = {
    _id: new Types.ObjectId().toString(),
    username: "username",
    password: "password"
}

describe('RegisterUserHandler', () => {
    let handler: RegisterUserHandler;
    let userFactory: UserFactory;
    let eventPublisher: EventPublisher;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RegisterUserHandler,
                {
                    provide: UserFactory,
                    useValue: {
                        create: jest.fn().mockResolvedValue(new User(mockUserData._id, mockUserData.username, mockUserData.password)),
                    },
                },
                {
                    provide: EventPublisher,
                    useValue: {
                        mergeObjectContext: jest.fn().mockImplementation((input) => input)

                    }
                },
            ],
        }).compile();

        handler = module.get<RegisterUserHandler>(RegisterUserHandler);
        userFactory = module.get<UserFactory>(UserFactory);
        eventPublisher = module.get<EventPublisher>(EventPublisher);
    });

    it('should execute RegisterUserCommand and create a user', async () => {
        const username = 'testuser';
        const password = 'testpassword';
        const registerUserReq = { username, password };
        const command = new RegisterUserCommand({ ...registerUserReq });

        const user = new User(mockUserData._id, mockUserData.username, mockUserData.password);
        (userFactory.create as jest.Mock).mockResolvedValue(user);

        const commitSpy = jest.spyOn(user, 'commit');

        await handler.execute(command);

        expect(userFactory.create).toHaveBeenCalledWith(username, password);
        expect(eventPublisher.mergeObjectContext).toHaveBeenCalledWith(user)
        expect(eventPublisher.mergeObjectContext).toHaveReturnedWith(user)
        expect(commitSpy).toHaveBeenCalled();
    });
});
