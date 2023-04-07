import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
    @ApiProperty({ example: 'Bukhara', description: 'Name of region' })
    @IsString()
    @IsNotEmpty()
    name: string
}
