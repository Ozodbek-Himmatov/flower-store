import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Customer } from 'src/customer/models/customer.model';

interface OtpAttr {
    otp: string;
    expiration_time: Date;
    verified: boolean;
}

@Table({ tableName: 'otp' })
export class Otp extends Model<Otp, OtpAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    otp: string;

    @Column({ type: DataType.DATE, allowNull: false })
    expiration_time: Date;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    verified: boolean;

    @HasMany(() => Customer)
    customer: Customer[];
}
