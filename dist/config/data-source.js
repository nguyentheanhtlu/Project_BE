"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../config/database.config"));
const dataBaseConfig = new database_config_1.default();
const dataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: dataBaseConfig.host,
    port: dataBaseConfig.port,
    username: dataBaseConfig.username,
    password: dataBaseConfig.password,
    database: dataBaseConfig.database,
    synchronize: dataBaseConfig.synchronize,
    logging: dataBaseConfig.logging,
    entities: [dataBaseConfig.entities],
    migrations: [dataBaseConfig.migrations]
});
dataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map