import { APIGatewayProxyEvent } from 'aws-lambda';
import { InternalServerErrorException } from './share/infrastructure/customErrors';
import { GeneralErrorResponse } from './share/infrastructure/Response';
import { VocabListsHandler } from './vocabLists/VocabListsHandler';

export const vocabListsHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const handlerObj = new VocabListsHandler(event);
        const response = await handlerObj.handler();
        return response;
    } catch (e) {
        return new GeneralErrorResponse(
            new InternalServerErrorException(
                `Internal Server Error: ${e.message}`,
            ),
        ).create();
    }
};
