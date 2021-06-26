import { FindCriteria } from '../../share/application/FindCriteria';
import { VocabListsRepo } from '../domain/VocabListsRepo';
import { VocabListsRequestGet } from '../infrastructure/VocabListsSchema';

export class GetVocabLists {
    private licenseRepo: VocabListsRepo;

    constructor(licenseRepo: VocabListsRepo) {
        this.licenseRepo = licenseRepo;
    }

    public async execute(licensesRequest?: VocabListsRequestGet): Promise<any> {
        const findCriteria = FindCriteria.build(licensesRequest);
        return await this.licenseRepo.getAll(findCriteria);
    }
}
