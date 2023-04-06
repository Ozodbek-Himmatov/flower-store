import {
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript';

interface AdminAttr {
    name: string
    email: string
    password: string
    refresh_token: string
    is_active: boolean
    is_owner: boolean
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    email: string;

    @Column({ type: DataType.STRING })
    password: string;

    @Column({ type: DataType.STRING })
    refresh_token: string;

    @Column({ type: DataType.BOOLEAN })
    is_active: boolean;

    @Column({ type: DataType.BOOLEAN })
    is_owner: boolean;
}
