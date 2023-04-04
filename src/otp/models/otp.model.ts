import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface OtpAttr {
    id: string;
    otp: string;
    expiration_time: Date;
    verified: boolean;
}

@Table({ tableName: 'otp' })
export class Otp extends Model<Otp, OtpAttr> {
    @Column({ type: DataType.UUID, autoIncrement: false, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    otp: string;

    @Column({ type: DataType.DATE, allowNull: false })
    expiration_time: Date;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    verified: boolean;
}
