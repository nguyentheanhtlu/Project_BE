require('dotenv').config();

class DataBaseConfig{

    type: string = process.env.DB_CONNECTION || 'mysql';
    host:string =  process.env.DB_HOST || 'localhost';
    port: number = Number(process.env.DB_PORT) || 3306;
    username: string = process.env.DB_USER || 'root';
    password: string = process.env.DB_PASS || 'root';
    database: string = process.env.DB_NAME || 'Project';
    synchronize: boolean = false;
    logging:boolean = false;
    entities:string = "./dist/models/*.js";
    migrations:string = "./dist/database/migrations/*.js";


}

export default DataBaseConfig;