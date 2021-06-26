import { APIGatewayEvent } from 'aws-lambda';
import { ObjectLiteral } from 'typeorm';
import {
    BaseError,
    NotImplementedException,
} from './infrastructure/customErrors';
import Request from './infrastructure/Request';
import {
    ApiResponse,
    DeleteResponse,
    GeneralErrorResponse,
    GetResponse,
    PostResponse,
} from './infrastructure/Response';

export interface StringKeyObject<Type> extends ObjectLiteral {
    [key: string]: Type;
}

export interface QueryStringParameters
    extends StringKeyObject<string | undefined> {}

export abstract class BaseHandler {
    private body?: ObjectLiteral;
    private pathParameters: APIGatewayEvent['pathParameters'];
    private queryStringParameters?: QueryStringParameters;
    public event: APIGatewayEvent;
    private schema: any;
    protected resourcePath: string;

    constructor(event: APIGatewayEvent, schema: any) {
        this.body = event.body ? JSON.parse(event.body) : {};
        this.pathParameters = event.pathParameters;
        this.queryStringParameters = event.queryStringParameters || {};
        this.event = event;
        this.schema = schema;
        this.resourcePath = event.resource;
    }

    public async handler(): Promise<ApiResponse> {
        switch (this.event.httpMethod) {
            case 'GET':
                try {
                    const queryParams = new Request(
                        this.queryStringParameters,
                        this.schema.get,
                    ).validate();
                    // set default filter criteria
                    queryParams.limit = queryParams.limit
                        ? queryParams.limit
                        : 30;
                    queryParams.offset = queryParams.offset
                        ? queryParams.offset
                        : 0;
                    queryParams.sort = queryParams.sort
                        ? queryParams.sort
                        : 'modified';

                    console.log('queryParams = ', queryParams);

                    const result = await this.get(
                        queryParams,
                        this.pathParameters,
                    );
                    return new GetResponse(result, queryParams).create();
                } catch (error: any) {
                    return this.buildError(error);
                }
            case 'POST':
                try {
                    console.log('POST');
                    const postBody: ObjectLiteral = new Request(
                        this.body,
                        this.schema.post,
                    ).validate();
                    console.log('body = ', postBody);

                    const result = await this.post(postBody);
                    return new PostResponse(result, this.resourcePath).create();
                } catch (error: any) {
                    return this.buildError(error);
                }
            case 'PUT':
                try {
                    const putBody: ObjectLiteral = new Request(
                        this.body,
                        this.schema.put,
                    ).validate();
                    console.log('body = ', putBody);

                    const result = await this.put(putBody, this.pathParameters);
                    return new PostResponse(result, this.resourcePath).create();
                } catch (error: any) {
                    return this.buildError(error);
                }
            case 'DELETE':
                try {
                    const id = await this.delete(this.pathParameters);
                    return new DeleteResponse(id).create();
                } catch (error) {
                    return this.buildError(error);
                }
            default:
                return this.unhandledMethod();
        }
    }

    public abstract get(
        queryParams?: any,
        pathParameters?: APIGatewayEvent['pathParameters'],
    ): Promise<any>;

    public abstract post(body?: ObjectLiteral): Promise<any>;

    public put(
        body?: ObjectLiteral,
        pathParameters?: APIGatewayEvent['pathParameters'],
    ): Promise<any> {
        throw new NotImplementedException(this.event.httpMethod);
    }

    public delete(
        pathParameters?: APIGatewayEvent['pathParameters'],
    ): Promise<any> {
        throw new NotImplementedException(this.event.httpMethod);
    }

    protected unhandledMethod(): ApiResponse {
        return new GeneralErrorResponse(
            new NotImplementedException(this.event.httpMethod),
        ).create();
    }

    protected buildError(error: BaseError): ApiResponse {
        return new GeneralErrorResponse(error).create();
    }
}
