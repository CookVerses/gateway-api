import { Controller, Get, Headers, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SwaggerTags } from '../../constants/enums/swagger-tags.enum';

import { UsersService } from './users.service';

@ApiTags(SwaggerTags.USERS)
@ApiBearerAuth('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getListOfUsers(@Headers() { authorization }, @Res() res) {
    return this.usersService.getListOfUsers(authorization, res);
  }
}
