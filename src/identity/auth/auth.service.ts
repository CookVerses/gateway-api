import { Injectable } from '@nestjs/common';
import * as superagent from 'superagent';

import { config } from '../../config';
import { convertSuperAgentErrorToResponse } from '../../helpers';

@Injectable()
export class AuthService {
  private readonly authUrl = `${config.USER_API_URL}/api/auth`;

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
        .post(`${this.authUrl}/login`)
        .send({ username, password });

      return res.status(status).json(body);
    } catch (err) {
      return convertSuperAgentErrorToResponse(res, err);
    }
  }

  /**
   * Call the auth API to get register user
   *
   * @param {string} username - the user's username
   * @param {string} password - the user's password
   * @param {string} firstName - the user's firstName
   * @param {string} lastName - the user's lastName
   * @param {string} email - the user's email
   * @param {string} gender - the user's gender
   *
   * @return {object} - the user's token
   */
  async registerUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    res,
  ) {
    try {
      const { body, status } = await superagent
        .post(`${this.authUrl}/register`)
        .send({ username, password, firstName, lastName, email, gender });

      return res.status(status).json(body);
    } catch (err) {
      return convertSuperAgentErrorToResponse(res, err);
    }
  }
}
