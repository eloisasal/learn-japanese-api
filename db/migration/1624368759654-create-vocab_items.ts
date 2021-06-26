import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createVocabItems1624368759654 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vocab_items',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'word',
                        type: 'varchar',
                    },
                    {
                        name: 'translation',
                        type: 'varchar',
                    },
                    {
                        name: 'pronunciation',
                        type: 'varchar',
                    },
                    {
                        name: 'association',
                        type: 'varchar',
                    },
                    {
                        name: 'image',
                        type: 'varchar',
                    },
                    {
                        name: 'vocab_list_id',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['vocab_list_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'vocablists',
                    },
                ],
            }),
            true,
        );
        await queryRunner.query(`
            ALTER TABLE "vocab_items" ADD "created_at" timestamp NOT NULL DEFAULT NOW();
            ALTER TABLE "vocab_items" ADD "modified_at" timestamp NOT NULL DEFAULT NOW();
            ALTER TABLE "vocab_items" ADD "created_by" int;
            ALTER TABLE "vocab_items" ADD "modified_by" int;
            CREATE TRIGGER set_modified BEFORE UPDATE ON vocab_items FOR EACH ROW EXECUTE PROCEDURE trigger_set_modified();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('vocab_items');
    }
}
