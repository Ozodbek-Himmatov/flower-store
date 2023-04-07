import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateOtpDto {
    @ApiProperty({ example: "122a" })
    @IsNumberString()
    otp: string;

    @ApiProperty({ example: "2007-01-01" })
    @IsDate()
    @IsNotEmpty()
    expiration_time: Date;

    @ApiProperty({ example: true })
    @IsNotEmpty()
    @IsBoolean()
    verified: boolean;
}
