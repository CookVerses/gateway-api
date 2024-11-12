import { Module } from '@nestjs/common';

import { UsersController } from './user/users.controller';
import { UsersService } from './user/users.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { SubscriptionsController } from './subscription/subscriptions.controller';
import { SubscriptionsService } from './subscription/subscriptions.service';

@Module({
  imports: [],
  controllers: [AuthController, UsersController, SubscriptionsController],
  providers: [AuthService, UsersService, SubscriptionsService],
})
export class IdentityModule {}
