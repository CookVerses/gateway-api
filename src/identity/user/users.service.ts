import { Injectable } from '@nestjs/common';
import * as superagent from 'superagent';

import { config } from '../../config';
import { convertSuperAgentErrorToResponse } from '../../helpers';

@Injectable()
export class UsersService {
  private readonly usersUrl = `${config.USER_API_URL}/api/users`;

  /**
   * Call the user API to get list of users
   *
   * @param {string} authorization - the authorization header
   *
   * @return {object}              - the list of users
   */
  async getListOfUsers(authorization = null, res) {
    try {
      const { body, status } = await superagent
        .get(this.usersUrl)
        .set('Authorization', authorization);

      return res.status(status).json(body);
    } catch (err) {
      return convertSuperAgentErrorToResponse(res, err);
    }
  }

  async getUserById(authorization = null, id, res) {
    try {
      const { body, status } = await superagent
        .get(`${this.usersUrl}/${id}`)
        .set('Authorization', authorization);

      return res.status(status).json(body);
    } catch (err) {
      return convertSuperAgentErrorToResponse(res, err);
    }
  }
}
