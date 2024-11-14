"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
class DataBaseConfig {
    constructor() {
        this.type = process.env.DB_CONNECTION || 'mysql';
        this.host = process.env.DB_HOST || 'localhost';
        this.port = Number(process.env.DB_PORT) || 3306;
        this.username = process.env.DB_USER || 'root';
        this.password = process.env.DB_PASS || 'root';
        this.database = process.env.DB_NAME || 'Project';
        this.synchronize = false;
        this.logging = false;
        this.entities = "./dist/models/*.js";
        this.migrations = "./dist/database/migrations/*.js";
    }
}
exports.default = DataBaseConfig;
//# sourceMappingURL=database.config.js.map