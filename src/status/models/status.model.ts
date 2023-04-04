import {
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Order } from 'src/order/models/order.model';

interface StatusAttr {
    name: string
    updatedAt: Date
}

@Table({ tableName: 'status' })
export class Status extends Model<Status, StatusAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.DATE })
    updatedAt: string

    @HasMany(() => Order)
    status_id: Order[];
}
