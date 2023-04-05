import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CustomerCardService } from './customer_card.service';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer_card.dto';

@ApiTags('CustomerCard')
@Controller('customerCard')
export class CustomerCardController {
  constructor(private readonly CustomerCardService: CustomerCardService) { }

  @ApiOperation({ summary: 'Create a customerCard' })
  @Post()
  create(@Body() createCustomerCardDto: CreateCustomerCardDto) {
    return this.CustomerCardService.create(createCustomerCardDto);
  }

  @ApiOperation({ summary: 'Get all customerCard' })
  @Get()
  findAll() {
    return this.CustomerCardService.findAll();
  }

  @ApiOperation({ summary: 'Get customerCard' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.CustomerCardService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update customerCard' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCustomerCardDto: UpdateCustomerCardDto,
  ) {
    return await this.CustomerCardService.update(+id, updateCustomerCardDto);
  }

  @ApiOperation({ summary: 'Delete customerCard' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.CustomerCardService.remove(id);
  }
}
