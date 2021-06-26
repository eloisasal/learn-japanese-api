import { VocabListsRepo } from '../domain/VocabListsRepo';

export class GetVocabListsById {
    private licenseRepo: VocabListsRepo;

    constructor(licenseRepo: VocabListsRepo) {
        this.licenseRepo = licenseRepo;
    }

    public async execute(id: number) {
        return await this.licenseRepo.getOne(id);
    }
}
