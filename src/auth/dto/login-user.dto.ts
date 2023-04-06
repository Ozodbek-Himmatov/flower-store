import { IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: '+998(90)-120-43-63' })
    @IsPhoneNumber()
    readonly phone: string;

    @ApiProperty({ example: 'Uzb@k!$t0n' })
    @IsString()
    readonly password: string;
}
