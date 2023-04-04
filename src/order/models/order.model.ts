import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Customer } from 'src/customer/models/customer.model';
import { DeliveryAddress } from 'src/delivery_address/models/delivery_address.model';
import { Flowers } from 'src/flowers/models/flower.model';
import { PaymentMethod } from 'src/payment_method/models/payment_method.model';
import { Status } from 'src/status/models/status.model';

interface OrderAttr {
    flower_id: number
    customer_id: number
    address_id: number
    status_id: number
    payment_method_id: number
    ordered_time: Date
    delivered_time: Date
    quantity: number
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Flowers)
    @Column({ type: DataType.INTEGER })
    flower_id: number;
    @BelongsTo(() => Flowers)
    flower: Flowers[];

    @ForeignKey(() => Customer)
    @Column({ type: DataType.INTEGER })
    customer_id: number;
    @BelongsTo(() => Customer)
    customer: Customer[];

    @ForeignKey(() => DeliveryAddress)
    @Column({ type: DataType.INTEGER })
    address_id: number;
    @BelongsTo(() => DeliveryAddress)
    address: DeliveryAddress[];

    @ForeignKey(() => Status)
    @Column({ type: DataType.INTEGER })
    status_id: number;
    @BelongsTo(() => Status)
    status: Status[];

    @ForeignKey(() => PaymentMethod)
    @Column({ type: DataType.INTEGER })
    payment_method_id: number;
    @BelongsTo(() => PaymentMethod)
    payment_method: PaymentMethod[];

    @Column({ type: DataType.DATE })
    ordered_time: Date

    @Column({ type: DataType.DATE })
    delivered_time: Date

    @Column({ type: DataType.BIGINT })
    quantity: number
}
