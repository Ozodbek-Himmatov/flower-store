import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private readonly orderRepo: typeof Order) { }

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepo.create(createOrderDto);
  }

  async findAll() {
    return await this.orderRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.orderRepo.findByPk(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepo.update(updateOrderDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: number) {
    return await this.orderRepo.destroy({ where: { id } });
  }
}
