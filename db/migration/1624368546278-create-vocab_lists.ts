import { MigrationInterface, QueryRunner } from 'typeorm';

export class createVocabListsts1624368546278 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE visibility_type AS ENUM ('public', 'private');
            CREATE TYPE kind_type AS ENUM ('vocabulary', 'grammar', 'kanji');
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);

        await queryRunner.query(`
            CREATE TABLE "study_list" (
                "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
                "name" VARCHAR(100) NOT NULL,
                "visibility" visibility_type NOT NULL DEFAULT 'public'
            ) INHERITS ("operation_logs");

            CREATE TRIGGER set_modified BEFORE UPDATE ON study_list FOR EACH ROW EXECUTE PROCEDURE trigger_set_modified();
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('study_list');
    }
}
