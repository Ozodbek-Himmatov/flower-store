import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer) private readonly customerRepo: typeof Customer) { }

  async create(createCustomerDto: CreateCustomerDto, hashed_password: string) {
    return await this.customerRepo.create({ ...createCustomerDto, hashed_password });
  }

  async findAll() {
    return await this.customerRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.customerRepo.findByPk(id);
  }

  async findOneByPhone(phone: string) {
    return await this.customerRepo.findOne({ where: { phone } });
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
