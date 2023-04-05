import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Colors } from './models/color.model';

@Module({
  imports: [SequelizeModule.forFeature([Colors])],
  controllers: [ColorsController],
  providers: [ColorsService]
})
export class ColorsModule { }
