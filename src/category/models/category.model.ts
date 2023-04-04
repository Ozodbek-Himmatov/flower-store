import {
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Flowers } from 'src/flowers/models/flower.model';

interface CategoryAttr {
    name: string
    description: string
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    description: string;

    @HasMany(() => Flowers)
    category_id: Flowers[];
}
