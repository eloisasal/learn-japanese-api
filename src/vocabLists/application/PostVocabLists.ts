import { VocabListsEntity } from '../domain/VocabListsEntity';
import { VocabListsRepo } from '../domain/VocabListsRepo';

export class PostVocabLists {
    private licenseRepo: VocabListsRepo;

    constructor(licenseRepo: VocabListsRepo) {
        this.licenseRepo = licenseRepo;
    }

    public async execute(license: Partial<VocabListsEntity>) {
        return await this.licenseRepo.save(license);
    }
}
