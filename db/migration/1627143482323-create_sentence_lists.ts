import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableSentenceLists1627143482323
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.createTable(
        //     new Table({
        //         name: 'sentence_lists',
        //         columns: [
        //             {
        //                 name: 'id',
        //                 type: 'uuid',
        //                 isPrimary: true,
        //                 isGenerated: true,
        //             },
        //             {
        //                 name: 'sentence',
        //                 type: 'varchar',
        //                 isNullable: false
        //             },
        //             {
        //                 name: 'vocab_item_id',
        //                 type: 'int',
        //                 isNullable: false
        //             },
        //         ],
        //         foreignKeys: [
        //             {
        //                 columnNames: ['vocab_item_id'],
        //                 referencedColumnNames: ['id'],
        //                 referencedTableName: 'vocab_items',
        //             },
        //         ],
        //     }),
        //     true,
        // );
        // await queryRunner.query(`
        //     ALTER TABLE "vocablists" ADD "created_at" timestamp NOT NULL DEFAULT NOW();
        //     ALTER TABLE "vocablists" ADD "modified_at" timestamp NOT NULL DEFAULT NOW();
        //     ALTER TABLE "vocablists" ADD "created_by" int;
        //     ALTER TABLE "vocablists" ADD "modified_by" int;
        //     CREATE TRIGGER set_modified BEFORE UPDATE ON vocablists FOR EACH ROW EXECUTE PROCEDURE trigger_set_modified();
        // `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
