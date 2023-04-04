import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Category } from 'src/category/models/category.model';
import { Colors } from 'src/colors/models/color.model';
import { Order } from 'src/order/models/order.model';
import { Otp } from 'src/otp/models/otp.entity';

interface FlowersAttr {
    category_id: number
    name: string
    price: number
    description: string
    image_url: string
    color_id: number
}

@Table({ tableName: 'flowers' })
export class Flowers extends Model<Flowers, FlowersAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    phone: string;

    @Column({ type: DataType.STRING })
    email: string;

    @Column({ type: DataType.STRING })
    hashed_password: string;

    @ForeignKey(() => Otp)
    @Column({ type: DataType.INTEGER })
    otp_id: number;
    @BelongsTo(() => Otp)
    otp: Otp[];

    @Column({ type: DataType.STRING })
    hashed_refresh_token: string;

    @HasMany(() => Order)
    flower_id: Order[];

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER })
    category_id: number;
    @BelongsTo(() => Category)
    category: Category[];

    @ForeignKey(() => Colors)
    @Column({ type: DataType.INTEGER })
    color_id: number;
    @BelongsTo(() => Colors)
    color: Colors[];
}
