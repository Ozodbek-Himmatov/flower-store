import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Flowers } from './models/flower.model';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';

@Injectable()
export class FlowersService {
  constructor(@InjectModel(Flowers) private readonly flowersRepo: typeof Flowers) { }

  async create(createFlowerDto: CreateFlowerDto) {
    return await this.flowersRepo.create(createFlowerDto);
  }

  async findAll() {
    return await this.flowersRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.flowersRepo.findByPk(id);
  }

  async update(id: number, updateFlowerDto: UpdateFlowerDto) {
    return await this.flowersRepo.update(updateFlowerDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: number) {
    return await this.flowersRepo.destroy({ where: { id } });
  }
}
