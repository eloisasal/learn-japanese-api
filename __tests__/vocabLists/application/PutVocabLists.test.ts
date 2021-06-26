import { PutVocabLists } from '../../../src/vocabLists/application/PutVocabLists';
import { VocabListsMother } from '../domain/VocabListsMother';
import { VocabListsRepoMock } from '../__mocks__/LicensesRepoMock';

describe('Application Post License', () => {
    it('post license', async () => {
        const vocabList = VocabListsMother.random();
        const repository = new VocabListsRepoMock();
        const applicationService = new PutVocabLists(repository);

        await applicationService.execute(vocabList, 1);

        repository.assertUpdate();
    });
});
