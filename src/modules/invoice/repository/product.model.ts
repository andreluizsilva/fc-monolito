import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";


@Table({
    tableName: "product",
    timestamps: false,
  })
export default class ProductModel extends Model {
    @PrimaryKey
    @Column
    id: string; 

    @ForeignKey(() => InvoiceModel)
    @Column
    invoiceId: string;

    @BelongsTo(() => InvoiceModel)
    invoice: InvoiceModel;
  
    @Column({ allowNull: false })
    name: string;
  
    @Column({ allowNull: false })
    price: number;

    @Column({ allowNull: false })
    quantity: number;   
}