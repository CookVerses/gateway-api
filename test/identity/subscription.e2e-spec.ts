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

  describe('GET /subscriptions', () => {
    it('should correctly forward the request to the users service and return list subscriptions', async () => {
      let authorizationHeader: any;
      const identityNock = nock(config.USER_API_URL)
        .get('/api/subscriptions')
        .reply(HttpStatus.OK, function () {
          authorizationHeader = this.req.headers.authorization;
          return {
            subscriptions: [
              {
                id: 'feef95c6-f146-4772-82d6-157a23b2e863',
                name: 'Premium',
                status: 'Đang hoạt động',
                startDate: '2024-03-09T17:00:00.000Z',
                endDate: '2025-03-09T17:00:00.000Z',
                createdAt: '2024-11-11T10:11:35.507Z',
                updatedAt: '2024-11-11T10:11:35.507Z',
              },
              {
                id: '375b4c0a-2db1-49b8-b626-241920b41712',
                name: 'Basic',
                status: 'Hết hạn',
                startDate: '2022-12-31T17:00:00.000Z',
                endDate: '2023-12-31T17:00:00.000Z',
                createdAt: '2024-11-11T10:11:35.507Z',
                updatedAt: '2024-11-11T10:11:35.507Z',
              },
            ],
          };
        });

      await request(app.getHttpServer())
        .get('/subscription')
        .set('Authorization', 'Bearer token')
        .expect(200)
        .expect({
          subscriptions: [
            {
              id: 'feef95c6-f146-4772-82d6-157a23b2e863',
              name: 'Premium',
              status: 'Đang hoạt động',
              startDate: '2024-03-09T17:00:00.000Z',
              endDate: '2025-03-09T17:00:00.000Z',
              createdAt: '2024-11-11T10:11:35.507Z',
              updatedAt: '2024-11-11T10:11:35.507Z',
            },
            {
              id: '375b4c0a-2db1-49b8-b626-241920b41712',
              name: 'Basic',
              status: 'Hết hạn',
              startDate: '2022-12-31T17:00:00.000Z',
              endDate: '2023-12-31T17:00:00.000Z',
              createdAt: '2024-11-11T10:11:35.507Z',
              updatedAt: '2024-11-11T10:11:35.507Z',
            },
          ],
        });
      identityNock.done();

      expect({ authorizationHeader }).toEqual({
        authorizationHeader: 'Bearer token',
      });
    });

    it('should correctly forward the request to the subscription api and return the correct error response', async () => {
      let authorizationHeader: any;

      const identityNock = nock(config.USER_API_URL)
        .get('/api/subscriptions')
        .reply(HttpStatus.UNAUTHORIZED, function () {
          authorizationHeader = this.req.headers.authorization;
          return {
            code: 'UNAUTHORIZED',
            status: 401,
            message: ['Unauthorized'],
          };
        });

      await request(app.getHttpServer())
        .get('/subscription')
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
