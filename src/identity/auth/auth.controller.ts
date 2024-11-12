import { Controller, Post, Res, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { SwaggerTags } from '../../constants/enums/swagger-tags.enum';
import { AuthService } from './auth.service';
import { loginBodySchema } from './auth.request-schema';

@ApiTags(SwaggerTags.AUTH)
@ApiBearerAuth('user')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody(loginBodySchema)
  @Post('/login')
  async getUserToken(
    @Body() body: { username: string; password: string },
    @Res() res,
  ) {
    return this.authService.getUserToken(body.username, body.password, res);
  }
}
