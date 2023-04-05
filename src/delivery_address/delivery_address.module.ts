import { Module } from '@nestjs/common';
import { DeliveryAddressService } from './delivery_address.service';
import { deliveryAddressController } from './delivery_address.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeliveryAddress } from './models/delivery_address.model';

@Module({
  imports: [SequelizeModule.forFeature([DeliveryAddress])],
  controllers: [deliveryAddressController],
  providers: [DeliveryAddressService]
})
export class DeliveryAddressModule { }
