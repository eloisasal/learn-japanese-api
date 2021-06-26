import { BaseEntity, Connection, createConnection } from 'typeorm';
import { VocabListsEntity } from '../../vocabLists/domain/VocabListsEntity';
import { VocabItemsEntity } from '../domain/VocabItemsEntity';
import config from './config';

export default class ConnectionManager {
    public static getConnection() {
        return this.connection;
    }

    public static async closeConnection() {
        await this.connection.close();
    }

    public static async createConnection() {
        if (!this.connection) {
            try {
                this.connection = await createConnection({
                    type: 'postgres',
                    host: config.host,
                    port: config.port,
                    username: config.username,
                    password: config.password,
                    database: config.database,
                    entities: [VocabListsEntity, VocabItemsEntity],
                    synchronize: false,
                    logging: true,
                });
            } catch (e) {
                return Promise.reject({
                    message: `Couldnt connect to database, err: ${e}`,
                });
            }
        }
        BaseEntity.useConnection(this.connection);
        return this.connection;
    }

    private static connection: Connection;
}
