import { MigrationInterface, QueryRunner } from 'typeorm';

export class createVocabItems1624368759654 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "words" (
                "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
                "word" VARCHAR(40) NOT NULL,
                "translation" VARCHAR(40) NOT NULL,
                "pronunciation" VARCHAR(40),
                "association" VARCHAR(100),
                "image" VARCHAR(100),
                "time_to_review" timestamp,
                "delay_to_review" timestamp,
                "study_list_id" uuid
            ) INHERITS ("operation_logs");

            ALTER TABLE "words"
            ADD CONSTRAINT "words_study_list_id_fkey"
            FOREIGN KEY ("study_list_id")
            REFERENCES "study_list"("id")
            ON DELETE CASCADE;


            CREATE TRIGGER set_modified BEFORE UPDATE ON words FOR EACH ROW EXECUTE PROCEDURE trigger_set_modified();
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // queryRunner.dropTable('words');
    }
}
