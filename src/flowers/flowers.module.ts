import { Module } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Flowers } from './models/flower.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Flowers]), JwtModule],
  controllers: [FlowersController],
  providers: [FlowersService]
})
export class FlowersModule { }
