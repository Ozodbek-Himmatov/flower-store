import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDistrictDto {
    @ApiProperty({ example: 'Chilonzor', description: 'Name of district' })
    @IsString()
    @IsNotEmpty()
    name: string
}
