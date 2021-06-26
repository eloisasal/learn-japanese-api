import * as faker from 'faker';
import { ObjectLiteral } from 'typeorm';
import Request from '../../src/share/infrastructure/Request';

const schema = {
    get: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            email: {
                type: 'string',
            },
        },
        additionalProperties: false,
    },
};
const eventBody = {
    name: faker.datatype.json(),
    email: faker.datatype.string(),
};
describe('Request test', () => {
    it('Validate schema and return request object', async () => {
        const queryParams: ObjectLiteral = new Request(
            eventBody,
            schema.get,
        ).validate();

        expect(queryParams).toBe(eventBody);
    });
});
