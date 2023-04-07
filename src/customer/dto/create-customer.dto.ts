import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPhoneNumber, IsStrongPassword, MinLength } from 'class-validator';

export class CreateCustomerDto {
    @ApiProperty({ example: '1' })
    @IsNotEmpty()
    @IsInt()
    otp_id: number

    @ApiProperty({ example: 'Uzb@k!$t0n' })
    @MinLength(7, {})
    @IsStrongPassword()
    password: string;

    @ApiProperty({ example: '+998(90)-120-43-63' })
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string
}
