import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { Otp } from 'src/otp/models/otp.model';
import { JwtModule } from '@nestjs/jwt';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [SequelizeModule.forFeature([Customer, Otp]), JwtModule, OtpModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule { }
