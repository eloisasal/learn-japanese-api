import { AwsService } from './AwsService';
import { CommonGetRequest } from './CommonSchema';
import { BaseError } from './customErrors';

export interface ApiResponse {
    statusCode: number | string;
    body: string;
    headers: any;
}

/** Base Model of Lambda Response */
export class BaseResponse {
    /** Create CORS Header */
    protected static createCorsHeader() {
        return {
            'Access-Control-Allow-Origin': '*',
        };
    }

    private readonly statusCode: number | string;
    private readonly headers: object;
    private readonly bodyObject: object;

    constructor(statusCode: number | string, headers: {}, bodyObject: {}) {
        this.statusCode = statusCode;
        this.headers = headers;
        this.bodyObject = bodyObject;
    }

    /** Create Lambda response object */
    public create(): ApiResponse {
        const response = {
            statusCode: this.statusCode,
            body: JSON.stringify(this.bodyObject),
            headers: this.headers,
        };
        console.log('response = ', response);
        return response;
    }
}

/** Response Model for General Errors */
export class GeneralErrorResponse extends BaseResponse {
    constructor(error: BaseError) {
        super(
            error.statusCode ? error.statusCode : 500,
            BaseResponse.createCorsHeader(),
            {
                message: error.message,
                result: 'Failure',
            },
        );
        AwsService.sendErrorToSns(error.message);
    }
}

/** Response Model for POST method */
export class PostResponse extends BaseResponse {
    public static createHeader(resourcePath: string) {
        const header = {
            'Access-Control-Allow-Origin': '*',
            Location: resourcePath,
        };
        return header;
    }

    constructor(bodyObject: object, resourcePath: string) {
        const bodyResponse = {
            result: 'success',
            data: bodyObject,
        };

        super(201, PostResponse.createHeader(resourcePath), bodyResponse);
    }
}

export class GetResponse extends BaseResponse {
    constructor(result: object | any[], queryParams: CommonGetRequest) {
        let bodyResponse = {};
        if (Array.isArray(result)) {
            const [data, count] = result;
            const currentPage =
                Math.ceil(queryParams.offset / queryParams.limit) + 1;
            let lastPage = Math.ceil(count / data.length);
            lastPage = lastPage ? lastPage : 1;

            bodyResponse = {
                result: 'success',
                found: count,
                lastPage,
                currentPage,
                pageSize: Math.min(queryParams.limit, data.length),
                data,
            };
        } else {
            bodyResponse = {
                result: 'success',
                data: result,
            };
        }

        super(200, BaseResponse.createCorsHeader(), bodyResponse);
    }
}

export class DeleteResponse extends BaseResponse {
    constructor(id: string) {
        super(204, BaseResponse.createCorsHeader(), {
            result: 'success',
            data: { id },
        });
    }
}
