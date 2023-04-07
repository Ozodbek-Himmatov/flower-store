import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateCategoryDto {
    @ApiProperty({ example: 'Rose', description: 'Name of category' })
    @IsString()
    @IsNotEmpty()
    name?: string

    @ApiProperty({ example: 'Rose', description: 'Description of category' })
    @IsNotEmpty()
    @IsString()
    description?: string
}
