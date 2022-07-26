import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { ProductType } from "./ProductType";
import { Receipt_has_Products } from "./Receipt_has_Porducts";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({
        type: "text"
    })
    description: string

    @ManyToOne(() => ProductType, (productType) => productType.products)
    @JoinColumn({
        name: 'productType_id',
        referencedColumnName: 'id'
    })
    productType: ProductType

    @OneToMany( ()=> Receipt_has_Products, receiptHasProducts => receiptHasProducts.productId)
    receiptHasProducts: Receipt_has_Products[]
}