import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'user123',
  })
  username: string;

  @ApiProperty({
    example: 'userpassword',
  })
  password: string;
}
