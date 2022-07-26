import {DataSource} from "typeorm"
import {Client} from "./entities/Client"//Aquí se importan todas las entidades que vayamos creando
import {Receipt} from "./entities/Receipt"
import { ProductType } from "./entities/ProductType" 
import { Product } from "./entities/Product"
import { Receipt_has_Products } from "./entities/Receipt_has_Porducts"
import { Store } from "./entities/Store"
//Database connection

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "typeorm_relations_2",
    entities: [
        Client,
        Receipt,
        ProductType, 
        Product, 
        Receipt_has_Products, 
        Store
    ], //Aqui se agregan las entidades importadas
    logging: false,
    synchronize: true
})