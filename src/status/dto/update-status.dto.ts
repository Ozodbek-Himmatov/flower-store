import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsString } from 'class-validator'

export class UpdateStatusDto {
    @ApiProperty({ example: 'Packaging', description: 'Name of status of product' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: '12/12/2022', description: 'Date pf status update' })
    @IsDateString()
    @IsNotEmpty()
    updatedAt: Date
}
