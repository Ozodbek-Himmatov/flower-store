import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
  ) { }

  //  Create / Register Admin 
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

  //  Login
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

  //  Getting Admin Token
  private async getToken(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_owner: admin.is_owner,
      is_admin: true
    };

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

  //  Simple CRUD
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

  //  Admin (de)activate and Owner (un)make
  async activate(id: number) {
    let admin = await this.adminRepo.findByPk(id, { include: { all: true } })

    if (!admin) {
      throw new HttpException("We do NOT have such Admin", HttpStatus.NOT_FOUND)
    }
    return this.adminRepo.update(
      { is_active: true },
      { where: { id: admin.dataValues.id }, returning: true }
    );
  }

  async deactivate(id: number) {
    let admin = await this.adminRepo.findByPk(id, { include: { all: true } })

    if (!admin) {
      throw new HttpException("We do NOT have such Admin", HttpStatus.NOT_FOUND)
    }
    return this.adminRepo.update(
      { is_active: false },
      { where: { id: admin.dataValues.id }, returning: true }
    );
  }

  async makeOwner(id: number) {
    let admin = await this.adminRepo.findByPk(id, { include: { all: true } })

    if (!admin) {
      throw new HttpException("We do NOT have such Admin", HttpStatus.NOT_FOUND)
    }
    return this.adminRepo.update(
      { is_owner: true },
      { where: { id: admin.dataValues.id }, returning: true }
    );
  }

  async unmakeOwner(id: number) {
    let admin = await this.adminRepo.findByPk(id, { include: { all: true } });

    if (!admin) {
      throw new HttpException("We do NOT have such Admin", HttpStatus.NOT_FOUND)
    }
    return this.adminRepo.update(
      { is_owner: false },
      { where: { id: admin.dataValues.id }, returning: true }
    );
  }
}
