import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator'

export class CreateOrderDto {

    @ApiProperty({ example: 200 })
    @IsNotEmpty()
    @IsInt()
    flower_id: number

    @ApiProperty({ example: 104256 })
    @IsNotEmpty()
    @IsInt()
    customer_id: number

    @ApiProperty({ example: 100000 })
    @IsNotEmpty()
    @IsInt()
    address_id: number

    @ApiProperty({ example: 102345 })
    @IsNotEmpty()
    @IsInt()
    status_id: number

    @ApiProperty({ example: 2 })
    @IsNotEmpty()
    @IsInt()
    payment_method_id: number

    @ApiProperty({ example: '18/08/2006' })
    @IsNotEmpty()
    @IsDateString()
    ordered_time: Date

    @ApiProperty({ example: '18/08/2006' })
    @IsNotEmpty()
    @IsDateString()
    delivered_time: Date

    @ApiProperty({ example: 100 })
    @IsNotEmpty()
    @IsInt()
    quantity: number
}
