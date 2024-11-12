import { Module } from '@nestjs/common';

import { UsersController } from './user/users.controller';
import { UsersService } from './user/users.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [],
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService],
})
export class IdentityModule {}
