import { Controller, Get, Headers, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

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

  @ApiParam({ name: 'id' })
  @Get('/:id')
  async getUserById(@Headers() { authorization }, @Param('id') id, @Res() res) {
    return this.usersService.getUserById(authorization, id, res);
  }
}
