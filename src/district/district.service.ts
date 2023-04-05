import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './models/district.model';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private readonly districtRepo: typeof District) { }

  async create(createDistrictDto: CreateDistrictDto) {
    return await this.districtRepo.create(createDistrictDto);
  }

  async findAll() {
    return await this.districtRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.districtRepo.findByPk(id);
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return await this.districtRepo.update(updateDistrictDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: number) {
    return await this.districtRepo.destroy({ where: { id } });
  }
}
