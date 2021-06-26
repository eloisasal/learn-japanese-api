import { EntityManager, FindManyOptions } from 'typeorm';
import BaseRepo from '../../share/infrastructure/BaseRepo';
import { VocabListsEntity } from '../domain/VocabListsEntity';
import { VocabListsRepo } from '../domain/VocabListsRepo';

export class VocabListsRepoPostgres extends BaseRepo implements VocabListsRepo {
    async getOne(id: number): Promise<VocabListsEntity | undefined> {
        return await this.transaction(async (manager: EntityManager) => {
            const repository = manager.getRepository(VocabListsEntity);
            return await repository.findOne(id);
        });
    }

    async getAll(
        findCriteria?: FindManyOptions<VocabListsEntity>,
    ): Promise<[VocabListsEntity[], number]> {
        return await this.transaction(async (manager: EntityManager) => {
            const repository = manager.getRepository(VocabListsEntity);
            return await repository.findAndCount({
                ...findCriteria,
            });
        });
    }

    async save(
        vocabList: Partial<VocabListsEntity>,
    ): Promise<VocabListsEntity> {
        return await this.transaction(async (manager: EntityManager) => {
            const repository = manager.getRepository(VocabListsEntity);
            const {
                modifiedAt,
                modifiedBy,
                createdBy,
                createdAt,
                ...vocabListResult
            } = await repository.save(vocabList);
            return Promise.resolve({
                ...vocabListResult,
            });
        });
    }

    async update(
        vocabList: Partial<VocabListsEntity>,
        id: number,
    ): Promise<VocabListsEntity> {
        return await this.transaction(async (manager: EntityManager) => {
            const repository = manager.getRepository(VocabListsEntity);
            await repository.update(id, vocabList);
            return (await repository.findOne(id)) as VocabListsEntity;
        });
    }

    async delete(id: number): Promise<number> {
        return await this.transaction(async (manager: EntityManager) => {
            const repository = manager.getRepository(VocabListsEntity);
            await repository.delete(id);
            return id;
        });
    }
}
