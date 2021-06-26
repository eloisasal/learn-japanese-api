import * as dotenv from 'dotenv';
dotenv.config();

interface Config {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    env: string;
    awsRegion: string;
}

const config: Config = {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!, 10),
    database: process.env.DB_DATABASE_NAME!,
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    env: process.env.ENV!,
    awsRegion: process.env.AWS_DEFAULT_REGION!,
};

export default config;
