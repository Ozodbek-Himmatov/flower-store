import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePaymentMethodDto {
    @ApiProperty({ example: 'Credit Card', description: 'Name of payment method' })
    @IsString()
    @IsNotEmpty()
    name: string
}
