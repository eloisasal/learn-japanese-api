import { GetVocabLists } from '../../../src/vocabLists/application/GetVocablists';
import { VocabListsRepoMock } from '../__mocks__/LicensesRepoMock';

describe('Application Get License', () => {
    it('get license', async () => {
        const repository = new VocabListsRepoMock();
        const applicationService = new GetVocabLists(repository);

        await applicationService.execute();

        repository.assertGetAll();
    });
});
