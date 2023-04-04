import {
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript';

interface CountryAttr {
    name: string
}

@Table({ tableName: 'country' })
export class Country extends Model<Country, CountryAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string;
}
