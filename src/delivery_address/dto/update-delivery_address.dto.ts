import { PartialType } from '@nestjs/swagger';
import { CreateDeliveryAddressDto } from './create-delivery_address.dto';

export class UpdateDeliveryAddressDto extends PartialType(CreateDeliveryAddressDto) {}
