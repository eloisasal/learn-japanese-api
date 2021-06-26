export const commonFilterProperties = {
    limit: {
        type: 'number',
    },
    offset: {
        type: 'number',
    },
    sort: {
        type: 'string',
    },
};

export interface CommonGetRequest {
    limit: number;
    offset: number;
    sort: any;
}

export interface CommonPostRequest {
    modifiedBy: number;
    createdBy: number;
}

export interface CommonPutRequest {
    modifiedBy: number;
}
