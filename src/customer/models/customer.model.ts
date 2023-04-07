import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { CustomerCard } from 'src/customer_card/models/customer_card.model';
import { Order } from 'src/order/models/order.model';
import { Otp } from 'src/otp/models/otp.model';

interface CustomerAttr {
    name: string
    phone: string
    email: string
    otp_id: number
    hashed_password: string
    hashed_refresh_token: string
    is_active: boolean
}

@Table({ tableName: 'customer' })
export class Customer extends Model<Customer, CustomerAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    phone: string;

    @Column({ type: DataType.STRING })
    email: string;

    @Column({ type: DataType.STRING })
    password: string;

    @ForeignKey(() => Otp)
    @Column({ type: DataType.INTEGER })
    otp_id: number;
    @BelongsTo(() => Otp)
    otp: Otp[];

    @Column({ type: DataType.STRING })
    hashed_password: string;

    @Column({ type: DataType.STRING })
    is_active: boolean;

    @Column({ type: DataType.STRING })
    hashed_refresh_token: string;

    @HasMany(() => CustomerCard)
    customer_card: CustomerCard[];

    @HasMany(() => Order)
    order: Order[];
}
