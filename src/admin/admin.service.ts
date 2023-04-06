import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
  ) { }


  async findAll() {
    return await this.adminRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.adminRepo.findByPk(id);
  }

  async getUserByEmail(email: string) {
    return await this.adminRepo.findOne({ where: { email } })
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: number) {
    return await this.adminRepo.destroy({ where: { id } });
  }
  async create(createAdminDto: CreateAdminDto) {
    let candid = await this.getUserByEmail(createAdminDto.email)
    if (candid) {
      throw new BadRequestException("We ALREADY have such User!")
    }

    let admin = this.adminRepo.create(createAdminDto)

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7)

    return await this.adminRepo.update(
      { password: hashed_password, is_active: true },
      { where: { id: (await admin).dataValues.id }, returning: true })
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {

    let candid = await this.adminRepo.findOne({ where: { name: loginAdminDto.name } })
    if (!candid) {
      throw new UnauthorizedException("We do NOT have such User!!")
    }

    const isPassCorrect = await bcrypt.compare(loginAdminDto.password, candid.dataValues.password)
    if (!isPassCorrect) {
      throw new UnauthorizedException("Pa22w0rd WRONG!!!")
    }

    const tokens = await this.getToken(candid)

    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7)

    const updatedAdmin = await this.adminRepo.update(
      { refresh_token: hashed_token },
      { where: { id: candid.id }, returning: true }
    )

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    return {
      message: "Logged IN unsuccessfully",
      admin: updatedAdmin,
      tokens
    }
  }

  private async getToken(user: Admin) {
    const payload = { id: user.id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token: accessToken, refresh_token: refreshToken };
  }
}
