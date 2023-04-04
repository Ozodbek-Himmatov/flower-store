import {
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Flowers } from 'src/flowers/models/flower.model';

interface ColorsAttr {
    name: string
}

@Table({ tableName: 'colors' })
export class Colors extends Model<Colors, ColorsAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @HasMany(() => Flowers)
    color_id: Flowers[];
}
