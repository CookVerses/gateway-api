import { Controller, Post, Res, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { SwaggerTags } from '../../constants/enums/swagger-tags.enum';
import { LoginDto } from './dto/login.dto';

import { AuthService } from './auth.service';

@ApiTags(SwaggerTags.AUTH)
@ApiBearerAuth('user')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @Post('/login')
  async getUserToken(@Body() body: LoginDto, @Res() res) {
    return this.authService.getUserToken(body.username, body.password, res);
  }
}
