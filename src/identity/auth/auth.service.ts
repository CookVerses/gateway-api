import { Injectable } from '@nestjs/common';
import * as superagent from 'superagent';

import { config } from '../../config';
import { convertSuperAgentErrorToResponse } from 'src/helpers';

@Injectable()
export class AuthService {
  private readonly authUrl = `${config.USER_API_URL}/api/auth/login`;

  /**
   * Call the auth API to get the user's token
   *
   * @param {string} username - the user's username
   * @param {string} password - the user's password
   *
   * @return {object} - the user's token
   */
  async getUserToken(username: string, password: string, res) {
    try {
      const { body, status } = await superagent
        .post(this.authUrl)
        .send({ username, password });

      return res.status(status).json(body);
    } catch (err) {
      return convertSuperAgentErrorToResponse(res, err);
    }
  }
}
