import { IsPhoneNumber, IsNotEmpty, IsStrongPassword, MinLength, IsInt, isNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: '+998(90)-120-43-63' })
    @IsNotEmpty()
    @IsPhoneNumber()
    readonly phone: string;

    @ApiProperty({ example: 'Uzb@k!$t0n' })
    @MinLength(7, {})
    @IsStrongPassword()
    readonly password: string;

    @ApiProperty({ example: '1' })
    @IsNotEmpty()
    @IsInt()
    readonly otp_id: number;
}
