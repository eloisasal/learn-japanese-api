import { MigrationInterface, QueryRunner } from 'typeorm';

export class createOperationLogs1618579200269 implements MigrationInterface {
    name = 'createOperationLogs1618579200269';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "operation_logs" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "created_by" integer NOT NULL,
                "modified_by" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION trigger_set_modified()
            RETURNS TRIGGER AS $$
            BEGIN
              NEW.modified_at = NOW();
              RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "operation_logs"`);
    }
}
