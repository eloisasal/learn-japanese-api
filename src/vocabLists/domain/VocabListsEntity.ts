import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OperationLogs } from '../../share/domain/OperationLogs';
import { VocabItemsEntity } from '../../share/domain/VocabItemsEntity';

@Entity('vocablists')
export class VocabListsEntity extends OperationLogs {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: 'name' })
    name!: string;

    @OneToMany(() => VocabItemsEntity, (vocabItems) => vocabItems.vocabList)
    public vocabItems?: VocabItemsEntity[];
}
