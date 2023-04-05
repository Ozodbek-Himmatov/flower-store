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
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@ApiTags('Colors')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) { }

  @ApiOperation({ summary: 'Create a color' })
  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @ApiOperation({ summary: 'Get all color' })
  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @ApiOperation({ summary: 'Get color' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.colorsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update color' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    return await this.colorsService.update(+id, updateColorDto);
  }

  @ApiOperation({ summary: 'Delete color' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.colorsService.remove(id);
  }
}
