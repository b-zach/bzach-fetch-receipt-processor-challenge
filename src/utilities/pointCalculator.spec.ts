import 'mocha';
import {PointCalculator} from './pointCalculator';
import assert from 'node:assert';
import { Receipt } from '../schema';

describe('PointCalculator', () => {
    const pointCalculator = new PointCalculator();
    let receipt: Receipt;

    beforeEach(() => {
        receipt = {
            retailer: '',
            purchaseDate: '2024-08-26',
            purchaseTime: '01:23',
            items: [],
            total: '0.1',
        };
    });

    it('should grant one point for every alphanumeric character in the retailer name', () => {
        receipt.retailer = "Bob's Burgers #123";

        const points = pointCalculator.calculatePoints(receipt);

        assert.equal(points, 14);
    });

    it('should grant 75 points if the total is a round dollar amount', () => {
        receipt.total = "1.00";

        const points = pointCalculator.calculatePoints(receipt);

        assert.equal(points, 75);
    });

    it('should grant 25 points if the total is not a round amount but a multiple of 0.25', () => {
        receipt.total = "1.50";

        const points = pointCalculator.calculatePoints(receipt);

        assert.equal(points, 25);
    });

    it('should grant 0 points if the total is not a round amount nor a multiple of 0.25', () => {
        receipt.total = "0.12";

        const points = pointCalculator.calculatePoints(receipt);

        assert.equal(points, 0);
    });

    it('should grant 5 points for every two items on the receipt', () => {
        receipt.items =  [
            {shortDescription: '', price: '0.00'},
            {shortDescription: '', price: '0.00'},
            {shortDescription: '', price: '0.00'},
        ];

        const points = pointCalculator.calculatePoints(receipt);

        assert.equal(points, 5);
    });

    it('should grant points if trimmed item description is a multiple of 3', () => {
        receipt.items =  [
            {shortDescription: 'abcdefghi ', price: '10.00'},
        ];

        const points = pointCalculator.calculatePoints(receipt);

        assert.equal(points, 2);
    });

    it('should grant no points if trimmed item description is not a multiple of 3', () => {
        receipt.items =  [
            {shortDescription: ' ab', price: '10.00'},
        ];

        const points = pointCalculator.calculatePoints(receipt);

        assert.equal(points, 0);
    });

    it('should grant 6 points if the date of purchase is odd', () => {
        receipt.purchaseDate = '2024-08-25';

        const points = pointCalculator.calculatePoints(receipt);

        assert.equal(points, 6);
    });

    it('should grant 10 points if the purchase was between 2pm and 4pm', () => {
        receipt.purchaseTime = '14:35';

        const points = pointCalculator.calculatePoints(receipt);

        assert.equal(points, 10);
    });

    it('should grant 10 points if the purchase was at 2pm', () => {
        receipt.purchaseTime = '14:00';

        const points = pointCalculator.calculatePoints(receipt);

        assert.equal(points, 10);
    });

    it('should not grant 10 points if the purchase was at 4pm', () => {
        receipt.purchaseTime = '16:00';

        const points = pointCalculator.calculatePoints(receipt);

        assert.equal(points, 0);
    });

    it('should not grant 10 points if the purchase was before 2pm', () => {
        receipt.purchaseTime = '2:00';

        const points = pointCalculator.calculatePoints(receipt);

        assert.equal(points, 0);
    });

    it('should not grant 10 points if the purchase was after 4pm', () => {
        receipt.purchaseTime = '18:59';

        const points = pointCalculator.calculatePoints(receipt);

        assert.equal(points, 0);
    });
});