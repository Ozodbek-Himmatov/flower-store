import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeliveryAddress } from './models/delivery_address.model';
import { CreateDeliveryAddressDto } from './dto/create-delivery_address.dto';
import { UpdateDeliveryAddressDto } from './dto/update-delivery_address.dto';

@Injectable()
export class DeliveryAddressService {
  constructor(@InjectModel(DeliveryAddress) private readonly deliveryAddressRepo: typeof DeliveryAddress) { }

  async create(createDeliveryAddressDto: CreateDeliveryAddressDto) {
    return await this.deliveryAddressRepo.create(createDeliveryAddressDto);
  }

  async findAll() {
    return await this.deliveryAddressRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.deliveryAddressRepo.findByPk(id);
  }

  async update(id: number, updateDeliveryAddressDto: UpdateDeliveryAddressDto) {
    return await this.deliveryAddressRepo.update(updateDeliveryAddressDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: number) {
    return await this.deliveryAddressRepo.destroy({ where: { id } });
  }
}
