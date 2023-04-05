import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerCard } from './models/customer_card.model';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer_card.dto';

@Injectable()
export class CustomerCardService {
  constructor(@InjectModel(CustomerCard) private readonly CustomerCardRepo: typeof CustomerCard) { }

  async create(createCustomerCardDto: CreateCustomerCardDto) {
    return await this.CustomerCardRepo.create(createCustomerCardDto);
  }

  async findAll() {
    return await this.CustomerCardRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.CustomerCardRepo.findByPk(id);
  }

  async update(id: number, updateCustomerCardDto: UpdateCustomerCardDto) {
    return await this.CustomerCardRepo.update(updateCustomerCardDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: number) {
    return await this.CustomerCardRepo.destroy({ where: { id } });
  }
}
