import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateColorDto {
    @ApiProperty({ example: 'White', description: 'Name of color' })
    @IsString()
    @IsNotEmpty()
    name: string
}
