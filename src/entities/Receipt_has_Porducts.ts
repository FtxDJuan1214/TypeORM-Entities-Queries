import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./Product";
import { Receipt } from "./Receipt";

@Entity()
export class Receipt_has_Products extends BaseEntity {

    //Esta parte es solo para que 
    //detecte las foráneas como llave primaria compuesta
    @PrimaryColumn({
        name: `receiptId`
    })
    receiptIdPk: string

    @PrimaryColumn({
        name: `productId`
    })
    productIdPk: string

    //-------------------------------------------------

    @Column()
    OrderNumber: number

    @Column()
    city: string

    @ManyToOne( ()=> Receipt, (receipt) => receipt.receiptHasProducts)
    @JoinColumn({
        name: `receiptId`,
        referencedColumnName: `id`
    })
    receiptId: Receipt

    @ManyToOne( ()=> Product, (product) => product.receiptHasProducts)
    @JoinColumn({
        name: `productId`,
        referencedColumnName: `id`
    })
    productId: Product
    
}