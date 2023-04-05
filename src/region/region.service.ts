import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './models/region.model';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private readonly regionRepo: typeof Region) { }

  async create(createRegionDto: CreateRegionDto) {
    return await this.regionRepo.create(createRegionDto);
  }

  async findAll() {
    return await this.regionRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.regionRepo.findByPk(id);
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    return await this.regionRepo.update(updateRegionDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: number) {
    return await this.regionRepo.destroy({ where: { id } });
  }
}
