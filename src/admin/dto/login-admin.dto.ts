import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator'

export class LoginAdminDto {

    @ApiProperty({ example: "Name", description: "Admin's Username" })
    @IsNotEmpty()
    @IsString()
    name: string

    @IsStrongPassword()
    @MinLength(7, {})
    @ApiProperty({ example: "Password", description: "password" })
    password: string

}