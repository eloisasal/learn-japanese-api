import { EntityManager } from 'typeorm';
import ConnectionManager from './ConnectionManager';

export default abstract class BaseRepo {
    public async transaction<T>(
        func: (manager: EntityManager) => Promise<T>,
    ): Promise<T> {
        const connection = await this.conn();
        return await connection.transaction(async (manager: EntityManager) => {
            return func(manager);
        });
    }

    private conn = async () => ConnectionManager.createConnection();
}
