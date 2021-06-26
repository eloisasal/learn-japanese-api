import { GetVocabListsById } from '../../../src/vocabLists/application/GetVocablistsById';
import { VocabListsRepoMock } from '../__mocks__/LicensesRepoMock';

describe('Application Get License by Id', () => {
    it('get license by Id', async () => {
        const repository = new VocabListsRepoMock();
        const applicationService = new GetVocabListsById(repository);

        await applicationService.execute(1);

        repository.assertGetOne();
    });
});
