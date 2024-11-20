import { ApiProperty } from "@nestjs/swagger";

export class UsersDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;
};