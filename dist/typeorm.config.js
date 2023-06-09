"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'ecommerce',
    entities: [__dirname + '/**/*.entity.{ts,js}'],
    synchronize: true,
};
exports.default = config;
