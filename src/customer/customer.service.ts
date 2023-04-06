import { BadRequestException, Injectable } from '@nestjs/common';
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


@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) private readonly customerRepo: typeof Customer,
    @InjectModel(Otp) private readonly otpRepo: typeof Otp,
  ) { }

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

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
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
            console.log(user);
            if (user) {
              const updatedUser = await this.customerRepo.update({},
                { where: { id: user.id }, returning: true },
              );
              await this.otpRepo.update(
                { verified: true },
                { where: { id: obj.otp_id }, returning: true },
              );
              console.log(updatedUser);
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
