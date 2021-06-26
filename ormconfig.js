module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    synchronize: false,
    logging: 'all',
    entities: ['src/**/*Entity.ts'],
    migrations: ['db/migration/**/*.ts'],
    subscribers: ['db/subscriber/**/*.ts'],
    cli: {
        entitiesDir: 'src/**/*Entity.ts',
        migrationsDir: 'db/migration',
        subscribersDir: 'db/subscriber',
    },
};
