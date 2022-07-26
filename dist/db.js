"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User"); //Aquí se importan todas las entidades que vayamos creando
//Database connection
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "typeormdb",
    entities: [User_1.User],
    logging: true,
    synchronize: true
});
