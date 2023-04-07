import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateAdminDto {
    @ApiProperty({ example: 'Admin', description: 'Name of admin' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: '+998(90)-120-43-63', description: 'Phone number of admin' })
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ example: 'P@$$w0rdd', description: 'Password of admin' })
    @IsStrongPassword()
    @MinLength(7, {})
    password: string;

    @ApiProperty({ example: 'admin@gmail.com', description: 'Email of admin' })
    @IsEmail()
    email: string;

}