import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator'

export class CreateCustomerCardDto {

    @ApiProperty({ example: '1549' })
    @IsNotEmpty()
    @IsInt()
    customer_id: number

    @ApiProperty({ example: 'Humo', description: 'Name of Customer\'s card' })
    @IsString()
    @IsNotEmpty()
    name: string


    @ApiProperty({ example: '+998(90)-120-43-63', description: 'Phone number of Customer card' })
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string

    @IsInt()
    @Length(16)
    @IsNotEmpty()
    number: string

    @IsInt()
    @ApiProperty({ example: 2006, description: 'Year of customer card' })
    year: string

    @IsString()
    @ApiProperty({ example: 'January', description: 'Month of customer card' })
    month: string
}
