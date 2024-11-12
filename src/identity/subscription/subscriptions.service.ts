import { Injectable } from '@nestjs/common';
import * as superagent from 'superagent';

import { config } from '../../config';
import { convertSuperAgentErrorToResponse } from '../../helpers';

@Injectable()
export class SubscriptionsService {
  private readonly subscriptionUrl = `${config.USER_API_URL}/api/subscriptions`;

  /**
   * Call the auth API to get list subscriptions
   *
   * @param {string} authorization - the authorization header
   *
   * @return {object}              - the list of subscription
   */

  async getListSubscription(authorization = null, res) {
    try {
      const { body, status } = await superagent
        .get(this.subscriptionUrl)
        .set('Authorization', authorization);

      return res.status(status).json(body);
    } catch (err) {
      return convertSuperAgentErrorToResponse(res, err);
    }
  }
}
