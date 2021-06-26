import { VocabItemsEntity } from '../../share/domain/VocabItemsEntity';
import {
    commonFilterProperties,
    CommonGetRequest,
    CommonPostRequest,
    CommonPutRequest,
} from '../../share/infrastructure/CommonSchema';

export const vocabListsSchema = {
    get: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            ...commonFilterProperties,
        },
        additionalProperties: false,
    },
    post: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            vocabItems: {
                type: 'array',
            },
        },
        required: ['name'],
        additionalProperties: false,
    },
    put: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            vocabItems: {
                type: 'array',
            },
        },
        additionalProperties: false,
    },
};

export interface VocabListsRequestGet extends CommonGetRequest {
    name?: string;
}
export interface VocabListsRequestPost extends CommonPostRequest {
    name: string;
    vocabItems?: VocabItemsEntity[];
}
export interface VocabListsRequestPut extends CommonPutRequest {
    name?: string;
    vocabItems?: VocabItemsEntity[];
}
