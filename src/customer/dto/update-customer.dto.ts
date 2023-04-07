import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'

export class UpdateCustomerDto {
    @ApiProperty({ example: 'Ozodbek Ximmatov', description: 'Name of customer' })
    @IsString()
    @IsNotEmpty()
    name?: string

    @ApiProperty({ example: '+998(90)-120-43-63', description: 'Phone number of customer' })
    @IsPhoneNumber()
    @IsNotEmpty()
    phone?: string

    @ApiProperty({ example: 'admin@gmail.com', description: 'Email of customer' })
    @IsEmail()
    email?: string

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsInt()
    otp_id?: number

    @ApiProperty({ example: '511b99806da59b3caf5a9c173cacfc5', description: 'hashed password of customer' })
    hashed_password?: string

    @ApiProperty({ example: '511b99806da59b3caf5a9c173cacfc5', description: 'hashed refresh token of customer' })
    hashed_refresh_token?: string
}
