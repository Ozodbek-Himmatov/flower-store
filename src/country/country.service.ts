import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from './models/country.model';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryService {
  constructor(@InjectModel(Country) private readonly countryRepo: typeof Country) { }

  async create(createCountryDto: CreateCountryDto) {
    return await this.countryRepo.create(createCountryDto);
  }

  async findAll() {
    return await this.countryRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.countryRepo.findByPk(id);
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    return await this.countryRepo.update(updateCountryDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: number) {
    return await this.countryRepo.destroy({ where: { id } });
  }
}
