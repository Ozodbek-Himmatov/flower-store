import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer) private readonly customerRepo: typeof Customer) { }

  async create(createCustomerDto: CreateCustomerDto) {
    return await this.customerRepo.create(createCustomerDto);
  }

  async findAll() {
    return await this.customerRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.customerRepo.findByPk(id);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerRepo.update(updateCustomerDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: number) {
    return await this.customerRepo.destroy({ where: { id } });
  }
}
