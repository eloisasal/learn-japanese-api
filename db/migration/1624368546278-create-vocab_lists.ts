import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createVocabListsts1624368546278 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vocablists',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: true,
                    },
                ],
            }),
            true,
        );
        await queryRunner.query(`
            ALTER TABLE "vocablists" ADD "created_at" timestamp NOT NULL DEFAULT NOW();
            ALTER TABLE "vocablists" ADD "modified_at" timestamp NOT NULL DEFAULT NOW();
            ALTER TABLE "vocablists" ADD "created_by" int;
            ALTER TABLE "vocablists" ADD "modified_by" int;
            CREATE TRIGGER set_modified BEFORE UPDATE ON vocablists FOR EACH ROW EXECUTE PROCEDURE trigger_set_modified();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vocablists');
    }
}
