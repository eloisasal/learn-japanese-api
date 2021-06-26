import { APIGatewayEvent } from 'aws-lambda';
import { BaseHandler } from '../share/BaseHandler';
import { DeleteVocabLists } from './application/DeleteVocablists';
import { GetVocabLists } from './application/GetVocablists';
import { GetVocabListsById } from './application/GetVocablistsById';
import { PostVocabLists } from './application/PostVocabLists';
import { PutVocabLists } from './application/PutVocabLists';
import { VocabListsRepoPostgres } from './infrastructure/VocabListsRepoPostgres';
import {
    VocabListsRequestGet,
    VocabListsRequestPost,
    VocabListsRequestPut,
    vocabListsSchema,
} from './infrastructure/VocabListsSchema';

export class VocabListsHandler extends BaseHandler {
    private vocabListRepo = new VocabListsRepoPostgres();

    constructor(event: APIGatewayEvent) {
        super(event, vocabListsSchema);
    }

    public async get(
        queryParams: VocabListsRequestGet,
        pathParameters?: APIGatewayEvent['pathParameters'],
    ): Promise<any> {
        if (pathParameters && pathParameters.id) {
            const id = parseInt(pathParameters.id, 10);
            return await new GetVocabListsById(this.vocabListRepo).execute(id);
        }
        return await new GetVocabLists(this.vocabListRepo).execute(queryParams);
    }

    public async post(body: VocabListsRequestPost): Promise<any> {
        return await new PostVocabLists(this.vocabListRepo).execute(body);
    }

    public async put(
        body: VocabListsRequestPut,
        pathParameters: APIGatewayEvent['pathParameters'],
    ): Promise<any> {
        if (!pathParameters || !pathParameters.id) {
            return Promise.reject('Id is required');
        }
        const id = parseInt(pathParameters.id, 10);
        return await new PutVocabLists(this.vocabListRepo).execute(body, id);
    }

    public async delete(
        pathParameters: APIGatewayEvent['pathParameters'],
    ): Promise<any> {
        if (!pathParameters || !pathParameters.id) {
            return Promise.reject('Id is required');
        }
        const id = parseInt(pathParameters.id, 10);
        return await new DeleteVocabLists(this.vocabListRepo).execute(id);
    }
}
