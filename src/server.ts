// @ts-ignore
import createEvent from 'aws-event-mocks';
import * as dotenv from 'dotenv';
import express from 'express';
import { Route, RouteMethod, routes } from './routes';
dotenv.config();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

const port = process.env.SERVER_PORT;

const context: any = {
    awsRequestId: 1,
};
const event = createEvent({
    template: 'aws:apiGateway',
    merge: {
        body: null,
    },
    pathParameters: {},
});

const getRequest = (route: Route) => {
    app.get(route.endpoint, async (req: any, res: any) => {
        console.log('GET ', req.path);
        console.log('Query params =  ', req.query);
        console.log('Path params =  ', req.params);
        event.httpMethod = route.method;
        event.pathParameters = req.params;
        event.queryStringParameters = req.query;
        event.headers = req.headers;
        const response: any = await route.handler(event, context);
        res.send(response.body);
    });
};

const postRequest = (route: Route) => {
    app.post(route.endpoint, async (req: any, res: any) => {
        console.log('POST ', route.endpoint);
        console.log('post body = ', event.body);
        event.httpMethod = route.method;
        event.headers = req.headers;
        event.body = req.body;
        const response: any = await route.handler(event, context);
        res.send(response.body);
    });
};

const putRequest = (route: Route) => {
    app.put(route.endpoint, async (req: any, res: any) => {
        console.log('PUT ', req.path);
        console.log('PUT body =  ', req.body);
        event.httpMethod = route.method;
        event.headers = req.headers;
        event.pathParameters = req.params;
        const body = req.body;
        event.body = body;
        const response: any = await route.handler(event, context);
        res.send(response.body);
    });
};

const deleteRequest = (route: Route) => {
    app.delete(route.endpoint, async (req: any, res: any) => {
        console.log('DELETE ', route.endpoint);
        event.httpMethod = route.method;
        event.headers = req.headers;
        event.pathParameters = req.params;
        const response: any = await route.handler(event, context);
        res.send(response.body);
    });
};

routes.forEach((route) => {
    switch (route.method) {
        case RouteMethod.GET:
            getRequest(route);
            break;
        case RouteMethod.POST:
            postRequest(route);
            break;
        case RouteMethod.PUT:
            putRequest(route);
            break;
        case RouteMethod.DELETE:
            deleteRequest(route);
            break;
        default:
            console.log('error, route method invalid');
            break;
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    console.log(`Endpoints: `);
    routes.forEach((route) =>
        console.log(
            `${route.method} http://localhost:${port}${route.endpoint}`,
        ),
    );
});
