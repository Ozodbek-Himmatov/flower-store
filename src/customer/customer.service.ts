import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PhoneUserDto } from './dto/phone-customer.dto';
import * as otpGenerator from 'otp-generator';
import { AddMinutesToDate } from 'src/helpers/addMinutesToDate';
import { Otp } from 'src/otp/models/otp.model';
import { dates, decode, encode } from 'src/helpers/crypto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) private readonly customerRepo: typeof Customer,
    @InjectModel(Otp) private readonly otpRepo: typeof Otp,
    private readonly jwtService: JwtService,
  ) { }

  //  Simple CRUD
  async create(createCustomerDto: CreateCustomerDto, hashed_password: string) {
    return await this.customerRepo.create({ ...createCustomerDto, hashed_password });
  }

  async findAll() {
    return await this.customerRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.customerRepo.findByPk(id);
  }

  async findOneByPhone(phone: string) {
    return await this.customerRepo.findOne({ where: { phone } });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerRepo.update(updateCustomerDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: number) {
    return await this.customerRepo.destroy({ where: { id } });
  }

  //  Register Customer
  async registration(createCustomerDto: CreateCustomerDto, res: Response) {
    const user = await this.customerRepo.findOne({
      where: { phone: createCustomerDto.phone }
    })
    if (user) {
      throw new BadRequestException("The number ALREADY Taken")
    }

    const hashed_password = await bcrypt.hash(createCustomerDto.password, 7)

    const newUser = await this.customerRepo.create({
      ...createCustomerDto,
      hashed_password
    })

    const tokens = await this.getToken(newUser)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)

    const updatedUser = await this.customerRepo.update({
      hashed_refresh_token
    },
      {
        where: {
          id: newUser.dataValues.id
        },
        returning: true
      })

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })


    const response = {
      message: "OTP number was SENT to your phone",
      user: updatedUser.entries,
      tokens
    }

    return response
  }

  private async getToken(user: Customer) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_user: true
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

  //  Logout
  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.PRIVATE_KEY
    })

    if (!userData) {
      throw new ForbiddenException("User NOT Found")
    }
    const updatedUser = await this.customerRepo.update({ hashed_refresh_token: null }, { where: { id: userData.id }, returning: true })

    res.clearCookie("refresh_token")

    const response = {
      message: "Logged OUT successfully",
      user: updatedUser[1][0]
    }

  }

  //  OTP generate
  async newOTP(phoneUserDto: PhoneUserDto) {
    try {
      const phone = phoneUserDto.phone;
      const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const now = new Date();
      const expiration_time = AddMinutesToDate(now, 7);
      const user = await this.customerRepo.create({ phone: phoneUserDto.phone })
      const customer = await this.customerRepo.findOne({ where: { phone } })
      await this.otpRepo.destroy({ where: { id: customer.otp_id } })

      const newOtp = await this.otpRepo.create({
        otp,
        expiration_time,
        verified: false
      });
      const details = {
        timestamp: now,
        phone: phone,
        success: true,
        message: 'OTP Sent to user',
        otp_id: newOtp.id,
      };
      const encoded = await encode(JSON.stringify(details));
      return { status: 'Success', Details: encoded };
    } catch (error) {
      return { status: 'Error', message: 'ERROR while generating Otp !!!' }
    }
  }

  //  verify Otp
  async verifyOtp(verifyOtpDto: VerifyOtpDto, res: Response) {
    const { verification_key, otp, phone } = verifyOtpDto;
    const current_date = new Date();
    const decoded = await decode(verification_key);
    const obj = JSON.parse(decoded);
    const check_obj = obj.phone;
    if (check_obj != phone)
      throw new BadRequestException('OTP has NOT been sent to THIS number');
    const result = await this.otpRepo.findOne({ where: { id: obj.otp_id } });
    if (result != null) {
      if (!result.verified) {
        if (dates.compare(result.expiration_time, current_date)) {
          if (otp === result.otp) {
            const user = await this.customerRepo.findOne({
              where: { phone: phone }
            });

            if (user) {
              const tokens = await this.getToken(user)
              res.cookie("refresh_token", tokens.refresh_token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true
              })

              const updatedUser = await this.customerRepo.update({},
                { where: { id: user.id }, returning: true },
              );
              await this.otpRepo.update(
                { verified: true },
                { where: { id: obj.otp_id }, returning: true },
              );

              const response = {
                user: updatedUser,
              };
              return response;
            }
          } else {
            throw new BadRequestException('Otp - NOT Match ERROR');
          }
        } else {
          throw new BadRequestException('Otp EXPIRED');
        }
      } else {
        throw new BadRequestException('Otp ALREADY used');
      }
    } else {
      throw new BadRequestException('We do NOT have such Customer');
    }
  }

}
