import { vocabListsHandler } from './main';

export enum RouteMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface Route {
    endpoint: string;
    handler: (event: any, context: any) => void;
    method: RouteMethod;
}

export const routes: Route[] = [
    {
        endpoint: '/api/vocabLists',
        handler: vocabListsHandler,
        method: RouteMethod.GET,
    },
    {
        endpoint: '/api/vocabLists',
        handler: vocabListsHandler,
        method: RouteMethod.POST,
    },
    {
        endpoint: '/api/vocabLists/:id',
        handler: vocabListsHandler,
        method: RouteMethod.PUT,
    },
    {
        endpoint: '/api/vocabLists/:id',
        handler: vocabListsHandler,
        method: RouteMethod.DELETE,
    },
];
