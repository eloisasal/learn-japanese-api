import { VocabListsEntity } from '../../../src/vocabLists/domain/VocabListsEntity';
import { VocabListsRepo } from '../../../src/vocabLists/domain/VocabListsRepo';

export class VocabListsRepoMock implements VocabListsRepo {
    private mockGetOne = jest.fn();
    private mockGetAll = jest.fn();
    private mockSave = jest.fn();
    private mockUpdate = jest.fn();
    private mockDelete = jest.fn();
    private vocabLists: VocabListsEntity[] = [];

    async getOne(): Promise<VocabListsEntity> {
        this.mockGetOne();
        return this.vocabLists[0];
    }

    async getAll(): Promise<any> {
        this.mockGetAll();
        return this.vocabLists;
    }

    async save(): Promise<VocabListsEntity> {
        this.mockSave();
        return this.vocabLists[0];
    }

    async update(): Promise<VocabListsEntity> {
        this.mockUpdate();
        return this.vocabLists[0];
    }

    async delete(): Promise<number> {
        this.mockDelete();
        return 1;
    }

    assertGetOne() {
        expect(this.mockGetOne).toHaveBeenCalled();
    }

    assertGetAll() {
        expect(this.mockGetAll).toHaveBeenCalled();
    }

    assertSave() {
        expect(this.mockSave).toHaveBeenCalled();
    }

    assertUpdate() {
        expect(this.mockUpdate).toHaveBeenCalled();
    }

    assertDelete() {
        expect(this.mockDelete).toHaveBeenCalled();
    }
}
