import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserSelfGuard } from 'src/guards/user-self.guard';
import { ActiveUserGuard } from 'src/guards/active-user.guard';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { Response } from 'express';
import { PhoneUserDto } from './dto/phone-customer.dto';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @ApiOperation({ summary: 'Create a customer' })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto, hashed_password: string) {
    return this.customerService.create(createCustomerDto, hashed_password);
  }

  @ApiOperation({ summary: 'Enter System' })
  @Post('otp')
  newOTP(@Body() phoneUserDto: PhoneUserDto, @Res({ passthrough: true }) res: Response) {
    return this.customerService.newOTP(phoneUserDto);
  }

  @ApiOperation({ summary: 'Exit System' })
  @Post('sign-out')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.customerService.logout(refreshToken, res)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(ActiveUserGuard)
  @ApiOperation({ summary: 'Get all customer' })
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(ActiveUserGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get customer' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customerService.findOne(+id);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(ActiveUserGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update customer' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customerService.update(+id, updateCustomerDto);
  }

  @UseGuards(ActiveUserGuard)
  @UseGuards(JwtAuthGuard)
  @UseGuards(UserSelfGuard)
  @ApiOperation({ summary: 'Delete customer' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.customerService.remove(id);
  }
}
