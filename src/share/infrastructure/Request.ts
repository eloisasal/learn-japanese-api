import Ajv from 'ajv';
import { ObjectLiteral } from 'typeorm';
import { InvalidParameterException } from './customErrors';

export default class Request {
    private eventBody: any;
    private schema: ObjectLiteral;

    constructor(eventBody: any, schema: ObjectLiteral) {
        this.eventBody = eventBody;
        this.schema = schema;
    }

    public validate() {
        const ajv = new Ajv({ allErrors: true });
        const requestBody = this.eventBody;
        const valid = ajv.validate(this.schema, requestBody);
        if (!valid) {
            let msg = '';
            for (const err of ajv.errors!) {
                msg += err.message + '. ';
            }
            throw new InvalidParameterException(
                `invalid request body or query string parameters: ${msg}`,
            );
        }
        return requestBody;
    }
}
