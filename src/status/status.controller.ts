import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('Status')
@Controller('status')
export class statusController {
  constructor(private readonly statusService: StatusService) { }

  @ApiOperation({ summary: 'Create a status' })
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @ApiOperation({ summary: 'Get all status' })
  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @ApiOperation({ summary: 'Get status' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.statusService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update status' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return await this.statusService.update(+id, updateStatusDto);
  }

  @ApiOperation({ summary: 'Delete status' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.statusService.remove(id);
  }
}
