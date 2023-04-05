import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentMethod } from './models/payment_method.model';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(@InjectModel(PaymentMethod) private readonly paymentMethodRepo: typeof PaymentMethod) { }

  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    return await this.paymentMethodRepo.create(createPaymentMethodDto);
  }

  async findAll() {
    return await this.paymentMethodRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.paymentMethodRepo.findByPk(id);
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return await this.paymentMethodRepo.update(updatePaymentMethodDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: number) {
    return await this.paymentMethodRepo.destroy({ where: { id } });
  }
}
