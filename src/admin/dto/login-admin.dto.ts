import { ApiProperty } from '@nestjs/swagger'

export class LoginAdminDto {

    @ApiProperty({ example: "Name", description: "Admin's Username" })
    name: string

    @ApiProperty({ example: "Password", description: "password" })
    password: string

}