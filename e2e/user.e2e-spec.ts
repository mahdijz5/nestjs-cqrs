import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as req from 'supertest';
import { AppModule } from '../src/app.module'
import TestAgent from 'supertest/lib/agent';

describe('UserController (e2e)', () => {
    let app: INestApplication;
    let request: TestAgent;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        request = req(app.getHttpServer());
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /user/register', () => {
        it('should register a user', async () => {
            const registerDto = {
                username: 'testuser',
                password: 'testpass',
                // Include other fields required by RegisterReqDto
            };

            const response = await request.post('/user/register').send(registerDto);
            expect(response.status).toBe(201); // Assuming successful registration returns 201
        });
    });

    describe('POST /user/login', () => {
        it('should login a user and return a token', async () => {
            const loginDto = {
                username: 'testuser',
                password: 'testpass',
                // Include other fields required by LoginReqDto
            };

            const response = await request.post('/user/login').send(loginDto);
            expect(response.status).toBe(200); // Assuming successful login returns 200
            expect(response.body.token).toBeDefined(); // Assuming you return a token in the response
        });
    });

    describe('POST /user/validate', () => {
        let token: string;

        beforeAll(async () => {
            // Register and login to obtain a JWT token for validation tests
            await request.post('/user/register').send({
                username: 'testuser',
                password: 'testpass',
            });

            const loginResponse = await request.post('/user/login').send({
                username: 'testuser',
                password: 'testpass',
            });
            token = loginResponse.body.token;
        });

        it('should validate the user', async () => {
            const response = await request
                .post('/user/validate')
                .set('Authorization', `Bearer ${token}`); // Set the JWT token in the header

            expect(response.status).toBe(200); // Assuming successful validation returns 200
        });
    });
});
