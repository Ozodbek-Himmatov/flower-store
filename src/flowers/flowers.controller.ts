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
import { FlowersService } from './flowers.service';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';

@ApiTags('Flowers')
@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) { }

  @ApiOperation({ summary: 'Create a flowers' })
  @Post()
  create(@Body() createFlowerDto: CreateFlowerDto) {
    return this.flowersService.create(createFlowerDto);
  }

  @ApiOperation({ summary: 'Get all flowers' })
  @Get()
  findAll() {
    return this.flowersService.findAll();
  }

  @ApiOperation({ summary: 'Get flowers' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.flowersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update flowers' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFlowerDto: UpdateFlowerDto,
  ) {
    return await this.flowersService.update(+id, updateFlowerDto);
  }

  @ApiOperation({ summary: 'Delete flowers' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.flowersService.remove(id);
  }
}
