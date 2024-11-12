import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as nock from 'nock';

import { AppModule } from '../../src/app.module';
import { config } from '../../src/config';

describe('UsersController (e2e)', () => {
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

  afterEach(async () => {
    nock.cleanAll();
  });

  describe('GET /users', () => {
    it('should correctly forward the request to the users service and return list user', async () => {
      let authorizationHeader: any;
      const identityNock = nock(config.USER_API_URL)
        .get('/api/users')
        .reply(HttpStatus.OK, function () {
          authorizationHeader = this.req.headers.authorization;
          return {
            users: [
              {
                id: '36d7937b-7c72-472b-8bd2-27ad339a70e8',
                username: 'anhcuongdangtest',
                firstName: 'Anh',
                lastName: 'Cuong',
                gender: 'nam',
                email: 'anhcuong@gmai.com',
                dateOfBirth: '2003-01-03T00:00:00.000Z',
                phoneNumber: '+84123456789',
                role: 'user',
                subscriptions: [
                  {
                    id: 'feef95c6-f146-4772-82d6-157a23b2e863',
                    name: 'Premium',
                    status: 'Đang hoạt động',
                    startDate: '2024-03-09T17:00:00.000Z',
                    endDate: '2025-03-09T17:00:00.000Z',
                  },
                ],
              },
            ],
          };
        });

      await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', 'Bearer token')
        .expect(200)
        .expect({
          users: [
            {
              id: '36d7937b-7c72-472b-8bd2-27ad339a70e8',
              username: 'anhcuongdangtest',
              firstName: 'Anh',
              lastName: 'Cuong',
              gender: 'nam',
              email: 'anhcuong@gmai.com',
              dateOfBirth: '2003-01-03T00:00:00.000Z',
              phoneNumber: '+84123456789',
              role: 'user',
              subscriptions: [
                {
                  id: 'feef95c6-f146-4772-82d6-157a23b2e863',
                  name: 'Premium',
                  status: 'Đang hoạt động',
                  startDate: '2024-03-09T17:00:00.000Z',
                  endDate: '2025-03-09T17:00:00.000Z',
                },
              ],
            },
          ],
        });

      identityNock.done();

      expect({ authorizationHeader }).toEqual({
        authorizationHeader: 'Bearer token',
      });
    });

    it('should correctly forward the request to the users service and return the correct error response', async () => {
      let authorizationHeader: any;

      const identityNock = nock(config.USER_API_URL)
        .get('/api/users')
        .reply(HttpStatus.UNAUTHORIZED, function () {
          authorizationHeader = this.req.headers.authorization;
          return {
            code: 'UNAUTHORIZED',
            status: 401,
            message: ['Unauthorized'],
          };
        });

      await request(app.getHttpServer())
        .get('/users')
        .expect(401)
        .expect({
          code: 'UNAUTHORIZED',
          status: 401,
          message: ['Unauthorized'],
        });

      identityNock.done();

      expect(authorizationHeader).toBeNull();
    });

    it('should correctly forward the request to the users api and return user by id', async () => {
      let authorizationHeader: any;

      const identityNock = nock(config.USER_API_URL)
        .get('/api/users/36d7937b-7c72-472b-8bd2-27ad339a70e8')
        .reply(HttpStatus.OK, function () {
          authorizationHeader = this.req.headers.authorization;
          return {
            user: {
              id: '36d7937b-7c72-472b-8bd2-27ad339a70e8',
              username: 'anhcuongdangtest',
              firstName: 'Anh',
              lastName: 'Cuong',
              gender: 'nam',
              email: 'anhcuong@gmai.com',
              dateOfBirth: '2003-01-03T00:00:00.000Z',
              phoneNumber: '+84123456789',
              role: 'user',
              subscriptions: [
                {
                  id: 'feef95c6-f146-4772-82d6-157a23b2e863',
                  name: 'Premium',
                  status: 'Đang hoạt động',
                  startDate: '2024-03-09T17:00:00.000Z',
                  endDate: '2025-03-09T17:00:00.000Z',
                },
              ],
            },
          };
        });

      await request(app.getHttpServer())
        .get('/users/36d7937b-7c72-472b-8bd2-27ad339a70e8')
        .set('Authorization', 'Bearer token')
        .expect(200)
        .expect({
          user: {
            id: '36d7937b-7c72-472b-8bd2-27ad339a70e8',
            username: 'anhcuongdangtest',
            firstName: 'Anh',
            lastName: 'Cuong',
            gender: 'nam',
            email: 'anhcuong@gmai.com',
            dateOfBirth: '2003-01-03T00:00:00.000Z',
            phoneNumber: '+84123456789',
            role: 'user',
            subscriptions: [
              {
                id: 'feef95c6-f146-4772-82d6-157a23b2e863',
                name: 'Premium',
                status: 'Đang hoạt động',
                startDate: '2024-03-09T17:00:00.000Z',
                endDate: '2025-03-09T17:00:00.000Z',
              },
            ],
          },
        });

      identityNock.done();

      expect({ authorizationHeader }).toEqual({
        authorizationHeader: 'Bearer token',
      });
    });

    it('should correctly forward the request to the users api and return the correct error response', async () => {
      let authorizationHeader: any;

      const identityNock = nock(config.USER_API_URL)
        .get('/api/users/36d7937b-7c72-472b-8bd2-27ad339a70e8')
        .reply(HttpStatus.UNAUTHORIZED, function () {
          authorizationHeader = this.req.headers.authorization;
          return {
            code: 'UNAUTHORIZED',
            status: 401,
            message: ['Unauthorized'],
          };
        });

      await request(app.getHttpServer())
        .get('/users/36d7937b-7c72-472b-8bd2-27ad339a70e8')
        .expect(401)
        .expect({
          code: 'UNAUTHORIZED',
          status: 401,
          message: ['Unauthorized'],
        });

      identityNock.done();

      expect(authorizationHeader).toBeNull();
    });
  });
});
