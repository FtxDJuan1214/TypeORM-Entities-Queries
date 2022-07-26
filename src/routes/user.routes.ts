import {Router} from "express"
import {
    getClients,
    getStore
} from "../controllers/user.controllers"

const router = Router()

//Listar ususarios
router.get('/clients', getClients)

//Listar tiendas con sus dependencias
router.get('/store', getStore)



export default router