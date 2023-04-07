import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class CreateFlowerDto {

    @ApiProperty({ example: 200 })
    @IsNotEmpty()
    @IsInt()
    category_id: number

    @ApiProperty({ example: 101 })
    @IsNotEmpty()
    @IsInt()
    color_id: number

    @ApiProperty({ example: 'Ozodbek Ximmatov', description: 'Name of customer' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: '$10', description: 'Price of flower' })
    @IsString()
    @IsNotEmpty()
    price: number


    @ApiProperty({ example: 'Lorem Ipsum', description: 'Description of flower' })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({ example: 'Lorem Ipsum', description: 'Description of flower' })
    @IsNotEmpty()
    @IsUrl()
    image_url: string
}
