import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Country } from 'src/country/models/country.model';
import { District } from 'src/district/models/district.model';
import { Order } from 'src/order/models/order.model';
import { Region } from 'src/region/models/region.model';

interface DeliveryAddressAttr {
    name: string
    country_id: number
    region_id: number
    district_id: number
    street: string
    house: string
    flat: number
    more_into: string
}

@Table({ tableName: 'delivery-address' })
export class DeliveryAddress extends Model<DeliveryAddress, DeliveryAddressAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string

    @ForeignKey(() => Country)
    @Column({ type: DataType.INTEGER })
    country_id: number
    @BelongsTo(() => Country)
    country: Country[];

    @ForeignKey(() => Region)
    @Column({ type: DataType.INTEGER })
    region_id: number
    @BelongsTo(() => Region)
    region: Region[];

    @ForeignKey(() => District)
    @Column({ type: DataType.INTEGER })
    district_id: number
    @BelongsTo(() => District)
    district: District[];

    @Column({ type: DataType.STRING })
    street: string

    @Column({ type: DataType.STRING })
    house: string

    @Column({ type: DataType.INTEGER })
    flat: number

    @Column({ type: DataType.TEXT })
    more_into: string

    @HasMany(() => Order)
    address_id: Order[];
}
