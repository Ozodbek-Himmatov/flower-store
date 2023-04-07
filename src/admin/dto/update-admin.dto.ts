import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator'

export class UpdateAdminDto {
    @ApiProperty({ example: "Name", description: "Admin's Username" })
    @IsNotEmpty()
    @IsString()
    name?: string

    @ApiProperty({ example: 'P@$$w0rdd', description: 'Password of admin' })
    @IsStrongPassword()
    @MinLength(7, {})
    password?: string
}