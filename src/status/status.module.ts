import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { statusController } from './status.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Status } from './models/status.model';

@Module({
  imports: [SequelizeModule.forFeature([Status])],
  controllers: [statusController],
  providers: [StatusService]
})
export class StatusModule { }
