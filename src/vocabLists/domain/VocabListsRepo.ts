import { FindManyOptions } from 'typeorm';
import { VocabListsEntity } from './VocabListsEntity';

export interface VocabListsRepo {
    getOne(id: number): Promise<VocabListsEntity | undefined>;
    getAll(
        findCriteria?: FindManyOptions<VocabListsEntity>,
    ): Promise<[VocabListsEntity[], number]>;
    save(license: Partial<VocabListsEntity>): Promise<VocabListsEntity>;
    update(
        license: Partial<VocabListsEntity>,
        id: number,
    ): Promise<VocabListsEntity | undefined>;
    delete(id: number): Promise<number>;
}
