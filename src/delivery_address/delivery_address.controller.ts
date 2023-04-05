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
import { DeliveryAddressService } from './delivery_address.service';
import { CreateDeliveryAddressDto } from './dto/create-delivery_address.dto';
import { UpdateDeliveryAddressDto } from './dto/update-delivery_address.dto';

@ApiTags('DeliveryAddress')
@Controller('deliveryAddress')
export class deliveryAddressController {
  constructor(private readonly deliveryAddressService: DeliveryAddressService) { }

  @ApiOperation({ summary: 'Create a deliveryAddress' })
  @Post()
  create(@Body() createDeliveryAddressDto: CreateDeliveryAddressDto) {
    return this.deliveryAddressService.create(createDeliveryAddressDto);
  }

  @ApiOperation({ summary: 'Get all deliveryAddress' })
  @Get()
  findAll() {
    return this.deliveryAddressService.findAll();
  }

  @ApiOperation({ summary: 'Get deliveryAddress' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.deliveryAddressService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update deliveryAddress' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDeliveryAddressDto: UpdateDeliveryAddressDto,
  ) {
    return await this.deliveryAddressService.update(+id, updateDeliveryAddressDto);
  }

  @ApiOperation({ summary: 'Delete deliveryAddress' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.deliveryAddressService.remove(id);
  }
}
