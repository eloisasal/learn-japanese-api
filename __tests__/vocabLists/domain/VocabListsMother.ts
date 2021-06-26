import * as faker from 'faker';
import { VocabListsEntity } from '../../../src/vocabLists/domain/VocabListsEntity';

export class VocabListsMother {
    static random(): VocabListsEntity {
        const obj = {
            name: faker.datatype.string(),
        };
        return obj;
    }

    static randomPost(): Partial<VocabListsEntity> {
        const obj = {
            name: faker.datatype.string(),
        };
        return obj;
    }

    static randomWithName(name: string) {
        return { ...this.random(), name };
    }

    static response(vocabList: Partial<VocabListsEntity>) {
        const {
            modifiedBy,
            modifiedAt,
            createdBy,
            createdAt,
            ...vocabListData
        } = vocabList;
        return {
            ...vocabListData,
        };
    }
}
