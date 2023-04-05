import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerCardModule } from './customer_card/customer_card.module';
import { OtpModule } from './otp/otp.module';
import { OrderModule } from './order/order.module';
import { DeliveryAddressModule } from './delivery_address/delivery_address.module';
import { CountryModule } from './country/country.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { StatusModule } from './status/status.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { FlowersModule } from './flowers/flowers.module';
import { CategoryModule } from './category/category.module';
import { ColorsModule } from './colors/colors.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Admin } from './admin/models/admin.model';
import { Category } from './category/models/category.model';
import { Colors } from './colors/models/color.model';
import { Country } from './country/models/country.model';
import { Customer } from './customer/models/customer.model';
import { CustomerCard } from './customer_card/models/customer_card.model';
import { DeliveryAddress } from './delivery_address/models/delivery_address.model';
import { District } from './district/models/district.model';
import { Flowers } from './flowers/models/flower.model';
import { Order } from './order/models/order.model';
import { Otp } from './otp/models/otp.model';
import { PaymentMethod } from './payment_method/models/payment_method.model';
import { Region } from './region/models/region.model';
import { Status } from './status/models/status.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Category,
        Colors,
        Country,
        Customer,
        CustomerCard,
        DeliveryAddress,
        District,
        Flowers,
        Order,
        Otp,
        PaymentMethod,
        Region,
        Status,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule, CustomerModule, CustomerCardModule, OtpModule, OrderModule, DeliveryAddressModule, CountryModule, RegionModule, DistrictModule, StatusModule, PaymentMethodModule, FlowersModule, CategoryModule, ColorsModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
