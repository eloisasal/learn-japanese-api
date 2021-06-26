import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { OperationLogs } from '../../share/domain/OperationLogs';
import { VocabListsEntity } from '../../vocabLists/domain/VocabListsEntity';

@Entity('vocab_items')
export class VocabItemsEntity extends OperationLogs {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: 'word' })
    word!: string;

    @Column({ name: 'translation' })
    translation!: string;

    @Column({ name: 'pronunciation' })
    pronunciation!: string;

    @Column({ name: 'association' })
    association!: string;

    @Column({ name: 'image' })
    image!: string;

    @ManyToOne(
        () => VocabListsEntity,
        (vocabLists: VocabListsEntity) => vocabLists.vocabItems,
    )
    @JoinColumn({ name: 'vocab_list_id' })
    public vocabList?: VocabListsEntity;
}
