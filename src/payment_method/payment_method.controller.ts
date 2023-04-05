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
import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';

@ApiTags('PaymentMethod')
@Controller('paymentMethod')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) { }

  @ApiOperation({ summary: 'Create a paymentMethod' })
  @Post()
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @ApiOperation({ summary: 'Get all paymentMethod' })
  @Get()
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @ApiOperation({ summary: 'Get paymentMethod' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.paymentMethodService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update paymentMethod' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return await this.paymentMethodService.update(+id, updatePaymentMethodDto);
  }

  @ApiOperation({ summary: 'Delete paymentMethod' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.paymentMethodService.remove(id);
  }
}
