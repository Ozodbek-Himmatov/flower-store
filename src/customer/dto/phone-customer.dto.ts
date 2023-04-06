import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class PhoneUserDto {
    @ApiProperty({ example: '998993216549' })
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;
}
