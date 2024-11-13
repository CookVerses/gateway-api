import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as nock from 'nock';

import { AppModule } from '../../src/app.module';
import { config } from '../../src/config';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('POST /auth/login', () => {
    it('should correctly forward the request to identity api and return response', async () => {
      let requestBody: any;

      const identityNock = nock(config.USER_API_URL)
        .post('/api/auth/login', (body) => {
          requestBody = body;
          return true;
        })
        .reply(HttpStatus.OK, function () {
          return {
            token: 'token',
          };
        });

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'anhcuongtest',
          password: 'anhcuongtest',
        })
        .expect(200)
        .expect({
          token: 'token',
        });

      identityNock.done();
    });

    it('should correctly forward the request to the users api and return the correct error response', async () => {
      let requestBody: any;
      const identityNock = nock(config.USER_API_URL)
        .post('/api/auth/login', (body) => {
          requestBody = body;
          return true;
        })
        .reply(HttpStatus.FORBIDDEN, function () {
          return {
            code: 'FORBIDDEN',
            status: 403,
            message: ['User does not exist'],
          };
        });
      await request(app.getHttpServer())
        .post('/auth/login')
        .expect(403)
        .expect({
          code: 'FORBIDDEN',
          status: 403,
          message: ['User does not exist'],
        });

      identityNock.done();
    });
  });

  describe('POST /auth/register', () => {
    it('should correctly forward the request to identity api and return response', async () => {
      let requestBody: any;

      const identityNock = nock(config.USER_API_URL)
        .post('/api/auth/register', (body) => {
          requestBody = body;
          return true;
        })
        .reply(HttpStatus.OK, function () {
          return {
            message: 'User registered successfully',
          };
        });

      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          username: 'anhcuongtest',
          password: 'anhcuongtest',
          firstName: 'Anh',
          lastName: 'Cuong',
          email: 'example@example.com',
          gender: 'nam',
        })
        .expect(200)
        .expect({
          message: 'User registered successfully',
        });

      identityNock.done();
    });

    it('should correctly forward the request to the users api and return the correct error response', async () => {
      let requestBody: any;
      const identityNock = nock(config.USER_API_URL)
        .post('/api/auth/register', (body) => {
          requestBody = body;
          return true;
        })
        .reply(HttpStatus.BAD_REQUEST, function () {
          return {
            code: 'BAD_REQUEST',
            status: 400,
            message: ['Username or email already exists'],
          };
        });
      await request(app.getHttpServer())
        .post('/auth/register')
        .expect(400)
        .expect({
          code: 'BAD_REQUEST',
          status: 400,
          message: ['Username or email already exists'],
        });

      identityNock.done();
    });
  });
});
