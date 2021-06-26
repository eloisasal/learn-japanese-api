import { PostVocabLists } from '../../../src/vocabLists/application/PostVocabLists';
import { VocabListsMother } from '../domain/VocabListsMother';
import { VocabListsRepoMock } from '../__mocks__/LicensesRepoMock';

describe('Application Post License', () => {
    it('post license', async () => {
        const vocabList = VocabListsMother.random();
        const repository = new VocabListsRepoMock();
        const applicationService = new PostVocabLists(repository);

        await applicationService.execute(vocabList);

        repository.assertSave();
    });
});
