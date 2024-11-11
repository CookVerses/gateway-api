import { Module } from '@nestjs/common';

import { UsersController } from './user/users.controller';
import { UsersService } from './user/users.service';
// import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class IdentityModule {}
