import 'mocha';
import {ReceiptValidator} from './receiptValidator';
import assert, { AssertionError } from 'node:assert';
import {Receipt} from '../schema';

describe('ReceiptValidator', () => {
    const receiptValidator = new ReceiptValidator();

    it('should validate a properly-formed receipt', () => {
        assert.ok(() => receiptValidator.validate(getValidReceipt()));
    });

    it('should assert retailer is in proper format', () => {
        const receipt: Receipt = {
            ...getValidReceipt(),
            retailer: 'invalid retailer!',
        };
        assert.throws(() => receiptValidator.validate(receipt), AssertionError, `retailer ${receipt.retailer} is invalid`);
    });

    it('should assert total is in proper format', () => {
        const receipt: Receipt = {
            ...getValidReceipt(),
            total: "12.abc",
        };
        assert.throws(() => receiptValidator.validate(receipt), AssertionError, `total ${receipt.total} is invalid`);
    });

    it('should assert receipt contains at least one item', () => {
        const receipt: Receipt = {
            ...getValidReceipt(),
            items: []
        };
        assert.throws(() => receiptValidator.validate(receipt), AssertionError, 'receipt should contain at least one item');
    });

    it('should assert item descriptions are in the proper format', () => {
        const receipt: Receipt = {
            ...getValidReceipt(),
            items: [
                {
                    price: "20.00",
                    shortDescription: "invalid description!",
                },
            ],
        };
        assert.throws(() => receiptValidator.validate(receipt), AssertionError, `item.shortDescription is invalid: ${receipt.items[0]!.shortDescription}`);
    });

    it('should assert item prices are in the proper format', () => {
        const receipt: Receipt = {
            ...getValidReceipt(),
            items: [
                {
                    price: "20,1a",
                    shortDescription: "item description",
                },
            ]
        };
        assert.throws(() => receiptValidator.validate(receipt), AssertionError, `item price '${receipt.items[0]!.shortDescription}' is invalid`);
    });

    it('should assert purchaseDate is a valid date', () => {
        const receipt: Receipt = {
            ...getValidReceipt(),
            purchaseDate: '',
        };
        assert.throws(() => receiptValidator.validate(receipt), AssertionError, `purchase date ${receipt.purchaseDate} is invalid`);
    });

    it('should assert purchaseTime is a valid time', () => {
        const receipt: Receipt = {
            ...getValidReceipt(),
            purchaseTime: '',
        };
        assert.throws(() => receiptValidator.validate(receipt), AssertionError, `purchase time ${receipt.purchaseTime} is invalid`);
    });

    function getValidReceipt(): Receipt {
        return {
            retailer: "retailer name",
            purchaseDate: "2024-08-26",
            purchaseTime: "12:34",
            items: [
                {
                    price: "20.00",
                    shortDescription: "item description",
                },
            ],
            total: "20.00",
        };
    }
});