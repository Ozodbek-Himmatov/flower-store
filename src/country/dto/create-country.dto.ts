import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDto {
    @ApiProperty({ example: 'O\'zbekiston', description: 'Name of available countries' })
    @IsString()
    @IsNotEmpty()
    name: string
}
