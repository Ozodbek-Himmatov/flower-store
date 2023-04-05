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
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) { }

  @ApiOperation({ summary: 'Create a admin' })
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({ summary: 'Get all admin' })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: 'Get admin' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.regionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update region' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return await this.regionService.update(+id, updateRegionDto);
  }

  @ApiOperation({ summary: 'Delete admin' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.regionService.remove(id);
  }
}
