import { Module } from '@nestjs/common';
import { DeliveryAddressService } from './delivery_address.service';
import { DeliveryAddressController } from './delivery_address.controller';

@Module({
  controllers: [DeliveryAddressController],
  providers: [DeliveryAddressService]
})
export class DeliveryAddressModule {}
