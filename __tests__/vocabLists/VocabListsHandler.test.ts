// @ts-ignore
import createEvent from 'aws-event-mocks';
import { getRepository } from 'typeorm';
import { vocabListsHandler } from '../../src/main';
import ConnectionManager from '../../src/share/infrastructure/ConnectionManager';
import { VocabListsEntity } from '../../src/vocabLists/domain/VocabListsEntity';
import { VocabListsRepoPostgres } from '../../src/vocabLists/infrastructure/VocabListsRepoPostgres';
import { VocabListsMother } from './domain/VocabListsMother';

const event: any = createEvent({
    template: 'aws:apiGateway',
    merge: {
        body: null,
    },
    pathParameters: {},
});

const repository: VocabListsRepoPostgres = new VocabListsRepoPostgres();

beforeEach(async () => {
    await ConnectionManager.createConnection();
    await getRepository(VocabListsEntity).query('DELETE FROM vocabLists');
});

afterAll(async () => {
    await ConnectionManager.closeConnection();
});

describe('VocabLists Handler', () => {
    it('#get', async () => {
        event.httpMethod = 'GET';
        const vocabList = VocabListsMother.random();
        const vocabListsaved = await repository.save(vocabList);

        const response = await vocabListsHandler(event);

        const responseBody = JSON.parse(response.body);
        const expectedResult = {
            result: 'success',
            found: 1,
            lastPage: 1,
            currentPage: 1,
            pageSize: 1,
            data: [vocabListsaved],
        };
        expect(responseBody).toEqual(expectedResult);
    });

    it('#get with pagination and sorting', async () => {
        event.httpMethod = 'GET';
        event.queryStringParameters = {
            limit: 2,
            offset: 2,
            sort: 'name',
        };
        const vocabLists = [
            VocabListsMother.random(),
            VocabListsMother.random(),
            VocabListsMother.random(),
            VocabListsMother.random(),
            VocabListsMother.random(),
        ];
        await Promise.all(
            vocabLists.map(async (vocabList) => repository.save(vocabList)),
        );

        const response = await vocabListsHandler(event);

        const responseBody: any = JSON.parse(response.body);
        const { data, ...responseInfo } = responseBody;
        const expectedResult = {
            result: 'success',
            found: 5,
            lastPage: 3,
            currentPage: 2,
            pageSize: 2,
        };
        expect(responseInfo).toEqual(expectedResult);
        expect(data.length).toEqual(2);
    });
    it('#get filtering', async () => {
        event.httpMethod = 'GET';
        event.queryStringParameters = {
            name: 'list test',
        };
        const vocabLists = [
            VocabListsMother.randomWithName('list test'),
            VocabListsMother.random(),
        ];
        const vocabListsSaved = await Promise.all(
            vocabLists.map(async (vocabList) => repository.save(vocabList)),
        );

        const response = await vocabListsHandler(event);
        const data = vocabListsSaved.filter((l) => l.name === 'list test');

        const responseBody = JSON.parse(response.body);
        const expectedResult = {
            result: 'success',
            found: 1,
            lastPage: 1,
            currentPage: 1,
            pageSize: 1,
            data,
        };
        expect(responseBody).toEqual(expectedResult);
    });
    it('#get by Id', async () => {
        event.httpMethod = 'GET';
        const vocabLists = [
            VocabListsMother.random(),
            VocabListsMother.random(),
        ];
        const vocabListsSaved = await Promise.all(
            vocabLists.map(async (vocabList) => repository.save(vocabList)),
        );
        event.pathParameters = { id: vocabListsSaved[0].id };

        const response = await vocabListsHandler(event);

        const responseBody = JSON.parse(response.body);
        expect(responseBody).toEqual({
            result: 'success',
            data: vocabListsSaved[0],
        });
    });
    it('#post', async () => {
        event.httpMethod = 'POST';
        const vocabList = VocabListsMother.randomPost();
        event.body = JSON.stringify(vocabList);

        const response = await vocabListsHandler(event);

        const responseBody = JSON.parse(response.body);
        expect(responseBody).toMatchObject({
            result: 'success',
            data: VocabListsMother.response(vocabList),
        });
    });

    it('#put', async () => {
        event.httpMethod = 'PUT';
        const vocabList = VocabListsMother.random();
        const repository: VocabListsRepoPostgres = new VocabListsRepoPostgres();
        const vocabListsaved = await repository.save(vocabList);
        const updateParams = { name: 'list test' };
        event.body = JSON.stringify(updateParams);
        event.pathParameters = { id: vocabListsaved.id };

        const response = await vocabListsHandler(event);

        const responseBody = JSON.parse(response.body);
        expect(responseBody.data.name).toEqual(updateParams.name);
    });

    it('#delete', async () => {
        event.httpMethod = 'DELETE';
        const vocabList = VocabListsMother.random();
        const repository: VocabListsRepoPostgres = new VocabListsRepoPostgres();
        const savedvocabList = await repository.save(vocabList);
        event.pathParameters = { id: savedvocabList.id };

        const response = await vocabListsHandler(event);

        const deletedvocabList = await repository.getOne(savedvocabList.id!);
        expect(deletedvocabList).toBeUndefined();
    });
});
