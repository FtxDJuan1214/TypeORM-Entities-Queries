import { 
    BaseEntity, 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    OneToOne,
    OneToMany,
    PrimaryColumn, 
    PrimaryGeneratedColumn
} from "typeorm"
import { Client } from "./Client"
import { Receipt_has_Products} from "./Receipt_has_Porducts"

@Entity()
export class Receipt extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    createdAt : Date

    @Column({
        type: "character varying", 
        array: true
    })
    total: string[]

    @OneToOne( ()=> Client)
    @JoinColumn()
    client: Client

    @OneToMany( ()=> Receipt_has_Products, receiptHasProducts => receiptHasProducts.receiptId)
    receiptHasProducts: Receipt_has_Products[]
}