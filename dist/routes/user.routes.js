"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const router = (0, express_1.Router)();
//Listar ususarios
router.get('/users', user_controllers_1.getUsers);
//Consultar ususario
router.get('/users/:id', user_controllers_1.getUser);
//Crear usuario
router.post('/users', user_controllers_1.createUser);
//Actualizar usuario
router.put('/users/:id', user_controllers_1.updateUser);
//Borrar usuario
router.delete('/users/:id', user_controllers_1.deleteUser);
exports.default = router;
