import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { OnlyOwnerGuard } from 'src/guards/only-owner.guard';
import { ActiveUserGuard } from 'src/guards/active-user.guard';
import { UserSelfGuard } from 'src/guards/user-self.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @ApiOperation({ summary: 'Create an admin' })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(ActiveUserGuard)
  @ApiOperation({ summary: 'Get all admin' })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(UserSelfGuard)
  @UseGuards(ActiveUserGuard)
  @ApiOperation({ summary: 'Get admin' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(ActiveUserGuard)
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update admin' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return await this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete admin' })
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.adminService.remove(id);
  }

  @UseGuards(OnlyOwnerGuard)
  @ApiOperation({ summary: "Making Project Owner" })
  @Get("make-owner/:id")
  makeOwner(@Param("id") id: string) {
    return this.adminService.makeOwner(+id);
  }

  @UseGuards(OnlyOwnerGuard)
  @ApiOperation({ summary: "Unmaking Owner" })
  @Get("unmakeOwner/:id")
  UnMakeOwner(@Param("id") id: string) {
    return this.adminService.unmakeOwner(+id);
  }

  @UseGuards(OnlyOwnerGuard)
  @ApiOperation({ summary: "Activate" })
  @Post("activate/:id")
  activate(@Param("id") id: string) {
    return this.adminService.activate(+id);
  }

  @UseGuards(OnlyOwnerGuard)
  @ApiOperation({ summary: "Deactivate" })
  @Post("deactivate/:id")
  deactivate(@Param("id") id: string) {
    return this.adminService.deactivate(+id);
  }
}
