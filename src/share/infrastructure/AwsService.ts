import * as AWS from 'aws-sdk';
import { PublishInput } from 'aws-sdk/clients/sns';
import config from './config';

export class AwsService {
    public static async sendErrorToSns(message: string) {
        if (config.env === 'local' || config.env === 'test') {
            return;
        }
        console.log('Error: ', message);
        try {
            const sns = new AWS.SNS({ region: config.awsRegion });
            const params: PublishInput = {
                TopicArn: `arn:aws:sns:us-east-1:017212038965:ep2as-${config.env}-sns`,
                Message: message,
                Subject: `PUBLIC API ${config.env} ERROR`,
            };
            await sns.publish(params).promise();
            console.log('message sended to slack');
        } catch (error) {
            console.log('Error sending message to slack: ', error);
        }
    }
}
