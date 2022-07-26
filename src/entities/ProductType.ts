import { BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Product } from "./Product"

type ActionList = `Food` | `Technology` | `Clothes` | `Home`

@Entity()
export class ProductType extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        name: `name`, 
        type: `enum`,
        enum: [`Food`,`Technology`,`Clothes`,`Home`]
    })
    name: ActionList

    @Column({
        unique: true
    })
    code: number

    @OneToMany ( ()=> Product, (product) => product.productType)
    products: Product[]
}