import 'mocha';
import {StorageService} from './storageService';
import assert from 'node:assert';

describe('StorageService', () => {
    const storageService = new StorageService();

    it('should generate unique IDs when storing points', () => {
        const id = storageService.storePoints(100);
        const newId = storageService.storePoints(200);

        assert.ok(id.length > 0);
        assert.notEqual(id, newId);
    });

    it('should retrieve points for stored id', () => {
        const id = storageService.storePoints(300);
        const points = storageService.getPoints(id);
        assert.equal(points, 300);
    });

    it('should throw error if no receipt found with matching id', () => {
        assert.throws(() => storageService.getPoints("unknownId"), Error, "No receipt found for id unknownId");
    });
});