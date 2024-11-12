import { Controller, Get, Headers, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { SwaggerTags } from '../../constants/enums/swagger-tags.enum';

import { SubscriptionsService } from './subscriptions.service';

@ApiTags(SwaggerTags.SUBSCRIPTIONS)
@ApiBearerAuth('user')
@Controller('subscription')
export class SubscriptionsController {
  constructor(private readonly SubsciptionService: SubscriptionsService) {}

  @Get('/')
  async getListOfSubsciptions(@Headers() { authorization }, @Res() res) {
    return this.SubsciptionService.getListSubscription(authorization, res);
  }
}
