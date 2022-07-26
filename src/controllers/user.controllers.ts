import { Request, Response } from "express"
import { Client } from "../entities/Client"
import { Receipt } from "../entities/Receipt"
import { ProductType } from "../entities/ProductType"
import { Product } from "../entities/Product"
import { Receipt_has_Products } from "../entities/Receipt_has_Porducts"
import { Store } from "../entities/Store"
import { AppDataSource } from "../db"
import { validate as uuidvalidate } from "uuid"
import { log } from "console"
import { type } from "os"

export const getClients = async (req: Request, res: Response) => {
    const clients = await AppDataSource
        .getRepository(Client)
        .createQueryBuilder(`client`)
        .getMany()


    return res.status(200).json(clients)
}


export const getStore = async (req: Request, res: Response) => {

    try {

        const { id } = req.query
        const { productId } = req.query

        const { clientId } = req.query

        if (!id || !productId) return res.status(400).json({ message: 'All ids are required' })

        if (!uuidvalidate(id as string)) res.status(400).json({ message: 'Id is not valid' })

        //QUERY 1 -------------------------------------------------------------------------

        const store = await AppDataSource
            .getRepository(Store)
            .createQueryBuilder('store')
            .leftJoinAndSelect(
                "store.parentStore",
                "storeParent"
            )
            .where('store.id = :id', { id: id })
            .getOne()

        //-------------------------------------------------------------------------------

        //QUERY 2 -------------------------------------------------------------------------
        
            //OPCIÓN 1 -----------------------------------------------------------------------

            const productInReceipts: Receipt_has_Products[] = await AppDataSource
                .getRepository(Receipt_has_Products)
                .createQueryBuilder('product')
                .leftJoinAndSelect(
                    "product.receiptId",
                    "receipt"
                )
                .where('product.productIdPk = :id', { id: productId })
                .getMany()

            const dat = productInReceipts.map((e: Receipt_has_Products) => {

                return {
                    id: e.receiptId.id,
                    createdAt: e.receiptId.createdAt,
                    total: e.receiptId.total,
                }
            })

            //-------------------------------------------------------------------------------

            //OPCIÓN 2 -----------------------------------------------------------------------
            const product = await Receipt_has_Products.findBy({ productIdPk: productId as string })

            const productInReceipts2 = await AppDataSource
                .createQueryBuilder()
                .relation(Receipt_has_Products, 'receiptId')
                .of(product)
                .loadMany()

            //-------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------


        //QUERY 3 -----------------------------------------------------------------------

        //Traer las facturas del cliente

        const clientProducts  = await AppDataSource
            .getRepository(Receipt)
            .createQueryBuilder('receipt')
            .leftJoin(
                "receipt.client",
                "client"
            )
            .leftJoin(
                "receipt.receiptHasProducts",
                "purchase"
            )
            .leftJoin(
                "purchase.productId",
                "products"
            )
            .select([
                'receipt.createdAt', 
                'receipt.total',
                'client.firstName',
                'client.lastName',
                'purchase',
                'products'
            ])
            .where('client.id = :id', { id: clientId })
            .getMany()

        const onlyProducts = clientProducts.flatMap((products) => {

            return products.receiptHasProducts.map((product) =>{
               return {
                name: product.productId.name, 
                description: product.productId.description
               }
            })
            
        })


        const clientProductsGrouped  = await AppDataSource
            .getRepository(ProductType)
            .createQueryBuilder('type')
            .leftJoin(
                "type.products",
                "products"
            )
            .leftJoin(
                "products.receiptHasProducts",
                "purchase"
            )
            .leftJoin(
                "purchase.receiptId",
                "receipt"
            )
            .leftJoin(
                "receipt.client",
                "client"
            )
            .select([
                'receipt.id', 
                'client.firstName',
                'client.lastName',
                'purchase.city',
                'purchase.receiptId',
                'products.name', 
                'type.name'
            ])
            .where('client.id = :id', { id: clientId })
            .getMany()

        const onlyProductsGrouped = clientProductsGrouped.flatMap((products) => {

            return {
                type: products.name, 
                products: products.products.map((product) => {
                    return product.name
                })
               }
            
        })


        //-------------------------------------------------------------------------------

        const data = [
            {
                store: "consult the stores and the parent store if you have one",
                data: store
            },
            {
                productInReceipts: "consult the receipts that has a specific product",
                data: [productInReceipts, productInReceipts2]
            },
            {
                producstByClient: "consult the purchased products by client",
                data: onlyProducts
            }, 
            {
                onlyProductsGrouped: "consult the purchased products by client grouped by product type",
                data: onlyProductsGrouped
            }
        ]


        if (!store) return res.status(404).json({ message: `The store doesn't exist` })

        return res.status(200).json(data)

    } catch (error) {

        if (error instanceof Error) {
            return res.status(500).json(error)
        }
    }
}