import { Module } from '@nestjs/common';
import { OwnerModule } from './owner/owner.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerCardModule } from './customer_card/customer_card.module';
import { OtpModule } from './otp/otp.module';
import { OrderModule } from './order/order.module';
import { DeliveryAddressModule } from './delivery_address/delivery_address.module';
import { CountryModule } from './region/country/country.module';
import { CountryModule } from './country/country.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { StatusModule } from './status/status.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { FlowersModule } from './flowers/flowers.module';
import { CategoryModule } from './category/category.module';
import { ColorsModule } from './colors/colors.module';

@Module({
  imports: [OwnerModule, AdminModule, CustomerModule, CustomerCardModule, OtpModule, OrderModule, DeliveryAddressModule, CountryModule, RegionModule, DistrictModule, StatusModule, PaymentMethodModule, FlowersModule, CategoryModule, ColorsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
