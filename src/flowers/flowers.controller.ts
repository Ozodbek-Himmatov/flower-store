import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FlowersService } from './flowers.service';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';

@ApiTags('Flowers')
@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) { }

  @ApiOperation({ summary: 'Create a flowers' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() createFlowerDto: CreateFlowerDto) {
    return this.flowersService.create(createFlowerDto);
  }

  @ApiOperation({ summary: 'Get all flowers' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.flowersService.findAll();
  }

  @ApiOperation({ summary: 'Get flowers' })
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.flowersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update flowers' })
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFlowerDto: UpdateFlowerDto,
  ) {
    return await this.flowersService.update(+id, updateFlowerDto);
  }

  @ApiOperation({ summary: 'Delete flowers' })
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.flowersService.remove(id);
  }
}
