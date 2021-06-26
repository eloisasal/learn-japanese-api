import { VocabListsEntity } from '../domain/VocabListsEntity';
import { VocabListsRepo } from '../domain/VocabListsRepo';

export class PutVocabLists {
    private licenseRepo: VocabListsRepo;

    constructor(licenseRepo: VocabListsRepo) {
        this.licenseRepo = licenseRepo;
    }

    public async execute(license: Partial<VocabListsEntity>, id: number) {
        return await this.licenseRepo.update(license, id);
    }
}
