import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class UpdateDeliveryAddressDto {

    @ApiProperty({ example: 'School No. 173', description: 'Name of delivery location' })
    @IsString()
    @IsNotEmpty()
    name?: string


    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsInt()
    country_id?: number


    @ApiProperty({ example: 2 })
    @IsNotEmpty()
    @IsInt()
    region_id?: number

    @ApiProperty({ example: 9 })
    @IsNotEmpty()
    @IsInt()
    district_id?: number

    @ApiProperty({ example: 'Zafar', description: 'Name of street' })
    @IsString()
    @IsNotEmpty()
    street?: string

    @ApiProperty({ example: '18', description: 'Name of house' })
    @IsString()
    @IsNotEmpty()
    house?: string

    @ApiProperty({ example: 39, description: 'Number of flat' })
    @IsInt()
    @IsNotEmpty()
    flat?: number

    @ApiProperty({ example: 'Near the 173rd school', description: 'Description for delivery location' })
    @IsString()
    @IsNotEmpty()
    more_into?: string
}
