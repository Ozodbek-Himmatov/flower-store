import {
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Order } from 'src/order/models/order.model';

interface PaymentMethodAttr {
    name: string
}

@Table({ tableName: 'payment_method' })
export class PaymentMethod extends Model<PaymentMethod, PaymentMethodAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @HasMany(() => Order)
    payment_method_id: Order[];
}
