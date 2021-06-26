import { DeleteVocabLists } from '../../../src/vocabLists/application/DeleteVocablists';
import { VocabListsRepoMock } from '../__mocks__/LicensesRepoMock';

describe('Application Post License', () => {
    it('post license', async () => {
        const repository = new VocabListsRepoMock();
        const applicationService = new DeleteVocabLists(repository);

        await applicationService.execute(1);

        repository.assertDelete();
    });
});
