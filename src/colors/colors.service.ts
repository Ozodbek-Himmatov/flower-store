import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateColorDto } from './dto/create-color.dto';
import { Colors } from './models/color.model';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorsService {
  constructor(@InjectModel(Colors) private readonly colorRepo: typeof Colors) { }

  async create(createColorDto: CreateColorDto) {
    return await this.colorRepo.create(createColorDto);
  }

  async findAll() {
    return await this.colorRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.colorRepo.findByPk(id);
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    return await this.colorRepo.update(updateColorDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: number) {
    return await this.colorRepo.destroy({ where: { id } });
  }
}
