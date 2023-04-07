import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
    @ApiProperty({ example: 'Credit Card', description: 'Name of payment method' })
    @IsString()
    @IsNotEmpty()
    name: string
}
