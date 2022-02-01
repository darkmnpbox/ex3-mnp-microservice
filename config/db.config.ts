
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

require('dotenv').config();

const getVal = (key: string): string => {
    return process.env[key];
}



const dbConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: getVal('DB_HOST'),
    port: parseInt(getVal('DB_PORT'), 10),
    username: getVal('DB_USERNAME'),
    password: getVal('DB_PASSWORD'),
    database: getVal('DB_DATABASE'),
    entities: [
        "dist/submodules/ex3-ms-entities/*.entity.js"
    ],
    migrations: [
        "dist/src/migrations/*.js"
    ],
    cli: {
        migrationsDir: "src/migrations"
    },
    synchronize: true
};

// const dbConfig: TypeOrmModuleOptions = {
//     type: 'postgres',
//     host: '127.0.0.1',
//     port: 5432,
//     username: 'test',
//     password: 'Niyas123',
//     database: 'test_typeorm',
//     entities: [
//         "dist/submodules/ex3-ms-entities/*.entity.js"
//     ],
//     migrations: [
//         "dist/src/migrations/*.js"
//     ],
//     cli: {
//         migrationsDir: "src/migrations"
//     },
//     synchronize: true
// };

export default dbConfig;