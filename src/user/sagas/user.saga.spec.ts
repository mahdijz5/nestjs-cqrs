import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { UserRegisterEvent } from '../events/register-user/register-user-event';
import { SendEmailCommand } from '../commands/send-email/send-email.command';
import { userSagas } from './user.saga';

describe('userSagas', () => {
    let saga: userSagas;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [userSagas], // Provide the saga
        }).compile();

        saga = module.get<userSagas>(userSagas);
    });

    it('should dispatch SendEmailCommand when UserRegisterEvent is received', (done) => {
         const timestamp = new Date()
        const mockEvent = new UserRegisterEvent({
            id: 'mock-id',
            username: 'mock-username',
            timestamp,
            email: 'mock-email',
        });

         const result$ = saga.userRegistered(of(mockEvent));

         result$.subscribe((command) => {
            expect(command).toBeInstanceOf(SendEmailCommand);
            expect(command).toEqual(
                new SendEmailCommand({
                    id: 'mock-id',
                    username: 'mock-username',
                    timestamp: mockEvent.registerUserEventReqDto.timestamp,
                    email: 'mock-email',
                    content: '',
                    subject: '',
                } as any)
            );
            done(); // Call done to signal the async test is complete
        });
    });
});
