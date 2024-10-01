import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as req from 'supertest';
import { AppModule } from '../src/app.module'
import TestAgent from 'supertest/lib/agent';
import { AllExceptionFilter } from '../src/common/filters';
import { cleanupDatabase, disconnectDb } from './utils/database.utils';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ERROR } from '../src/common/enums';

const userMock = {
    username: 'testuser',
    password: 'tetsPass',
}

describe('UserController (e2e)', () => {
    let app: INestApplication;
    let request: TestAgent;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, MongooseModule.forRoot('mongodb://localhost:27017/ddd')],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalFilters(new AllExceptionFilter());
        request = req(app.getHttpServer());

        await app.init();

        await cleanupDatabase()
    });

    afterAll(async () => {
        await cleanupDatabase()
        await disconnectDb()
        await app.close();
    });

    describe('POST /user/register', () => {
        it('should register a user', async () => {
            const registerDto = {
                username: userMock.username,
                password: userMock.password,
                
            };

            const response = await request.post('/user/register').send(registerDto);
            expect(response.status).toBe(201);  
        });

        it('should throw already exist error', async () => {
            const registerDto = {
                username: userMock.username,
                password: userMock.password,
 
            };

            const response = await request.post('/user/register').send(registerDto);
            console.log()
            expect(response.status).toBe(400); 
            expect(response.body.errors).toEqual(ERROR.ALREADY_EXISTS);  
        });
    });

    describe('POST /user/login', () => {
        it('should login a user and return a token', async () => {
            const loginDto = {
                username: userMock.username,
                password: userMock.password,
 
            };

            const response = await request.post('/user/login').send(loginDto);
            expect(response.status).toBe(200);  
            expect(response.body.token).toBeDefined();  
        });
        
        it('should throw invalid credential erros', async () => {
            const loginDto = {
                username: userMock.username,
                password: "wrongPass",
 
            };

            const response = await request.post('/user/login').send(loginDto);
            expect(response.status).toBe(400);  
            expect(response.body.errors).toEqual(ERROR.INVALID_CREDENTIALS);  
        });
    });

    describe('POST /user/validate', () => {
        let token: string;

        beforeAll(async () => {
            await request.post('/user/register').send({
                username: userMock.username,
                password: userMock.password,
            });

            const loginResponse = await request.post('/user/login').send({
                username: userMock.username,
                password: userMock.password,
            });
            token = loginResponse.body.token;
        });

        it('should validate the user', async () => {
            const response = await request
                .post('/user/validate')
                .set('Authorization', `Bearer ${token}`);  

            expect(response.status).toBe(200); 
        });
        
        it('should unathorized error', async () => {
            const response = await request
                .post('/user/validate')
                .set('Authorization', `Bearer invalidToken`);  

         
            expect(response.status).toBe(401); 
        });
    });
});
