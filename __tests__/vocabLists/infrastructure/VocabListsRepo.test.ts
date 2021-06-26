import { FindManyOptions } from 'typeorm';
import ConnectionManager from '../../../src/share/infrastructure/ConnectionManager';
import { VocabListsEntity } from '../../../src/vocabLists/domain/VocabListsEntity';
import { VocabListsRepoPostgres } from '../../../src/vocabLists/infrastructure/VocabListsRepoPostgres';
import { VocabListsMother } from '../domain/VocabListsMother';

const repository: VocabListsRepoPostgres = new VocabListsRepoPostgres();

beforeEach(async () => {
    await ConnectionManager.createConnection();
    await ConnectionManager.getConnection().query('DELETE FROM vocabLists');
});

afterAll(async () => {
    await ConnectionManager.closeConnection();
});

describe('Infrastructure vocabLists repository', () => {
    describe('#save', () => {
        it('should be able to persist a vocabList', async () => {
            const vocabList = VocabListsMother.random();

            const persistedvocabList = await repository.save({ ...vocabList });

            expect(persistedvocabList).toMatchObject(
                VocabListsMother.response(vocabList),
            );
            expect(persistedvocabList.id).not.toBeNull();
        });
    });

    describe('#getOne', () => {
        it('should return a vocabList by Id', async () => {
            const vocabList = VocabListsMother.random();
            const persistedvocabList = await repository.save(vocabList);

            const expectedvocabList = await repository.getOne(
                persistedvocabList.id!,
            );

            expect(expectedvocabList).toMatchObject(
                VocabListsMother.response(vocabList),
            );
        });
    });

    describe('#getAll', () => {
        it('should return the existing vocabLists', async () => {
            const vocabLists = [
                VocabListsMother.random(),
                VocabListsMother.random(),
            ];
            const savedVocabLists = await Promise.all(
                vocabLists.map(async (vocabList) => repository.save(vocabList)),
            );

            const [responseVocabLists, count] = await repository.getAll();

            responseVocabLists.forEach((res: any) => {
                const found = savedVocabLists.find((el) => el.id === res.id);
                expect(res).toEqual(found!);
            });
        });
        it('should return a vocabLists filtered by criteria', async () => {
            const vocabLists = [
                VocabListsMother.random(),
                VocabListsMother.random(),
            ];
            const savedVocabLists = await Promise.all(
                vocabLists.map(async (vocabList) => repository.save(vocabList)),
            );

            const findCriteria: FindManyOptions<VocabListsEntity> = {
                where: {
                    name: vocabLists[0].name,
                },
            };
            const [responseVocabLists, count] = await repository.getAll(
                findCriteria,
            );

            const expectedVocabLists = savedVocabLists.filter(
                (l) => l.name === vocabLists[0].name,
            );
            responseVocabLists.forEach((res: any) => {
                const found = expectedVocabLists.find((el) => el.id === res.id);
                expect(res).toEqual(found!);
            });
        });
    });

    describe('#update', () => {
        it('Should update an existing vocabList with new values', async () => {
            const vocabList = VocabListsMother.random();
            const persistedvocabList = await repository.save(vocabList);
            const updatevocabList: Partial<VocabListsEntity> = {
                ...persistedvocabList,
                name: 'list test',
            };

            const updatedvocabList = await repository.update(
                updatevocabList,
                persistedvocabList.id!,
            );

            expect(updatedvocabList).toEqual(updatevocabList);
        });
    });

    describe('#delete', () => {
        it('should delete vocabList', async () => {
            const vocabLists = [
                VocabListsMother.random(),
                VocabListsMother.random(),
            ];
            const resolve = await Promise.all(
                vocabLists.map(async (vocabList) => repository.save(vocabList)),
            );

            const expectedvocabLists = await repository.getAll();
            expect(expectedvocabLists).toHaveLength(vocabLists.length);

            await repository.delete(resolve[0].id!);
            const [vocabListsAfterDelete, count] = await repository.getAll();
            expect(vocabListsAfterDelete).toHaveLength(vocabLists.length - 1);
        });
    });
});
