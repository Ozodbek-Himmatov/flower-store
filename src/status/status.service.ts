import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Status } from './models/status.model';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private readonly statusRepo: typeof Status) { }

  async create(createStatusDto: CreateStatusDto) {
    return await this.statusRepo.create(createStatusDto);
  }

  async findAll() {
    return await this.statusRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.statusRepo.findByPk(id);
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    return await this.statusRepo.update(updateStatusDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: number) {
    return await this.statusRepo.destroy({ where: { id } });
  }
}
