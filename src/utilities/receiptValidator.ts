import {Receipt, Item} from '../schema';
import assert from 'node:assert';

export class ReceiptValidator {
    public validate(receipt: Receipt): void {
        const moneyFormatValidator: RegExp = /^\d+\.\d{2}$/;
        const textValidator: RegExp = /^[\w\s\-&]+$/;
        const timeValidator: RegExp = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;

        // 'retailer' should be in the proper format.
        assert(textValidator.test(receipt.retailer), `retailer ${receipt.retailer} is invalid`);

        // 'total' should be the proper monetary format.
        assert(moneyFormatValidator.test(receipt.total), `total ${receipt.total} is invalid`);

        // Receipt should contain at least one item.
        assert(receipt.items.length > 0, 'receipt should contain at least one item');

        receipt.items.forEach((item: Item) => {
            // All item descriptions should be valid.
            assert(textValidator.test(item.shortDescription), `item.shortDescription is invalid: ${item.shortDescription}`);

            // All item prices should be in the proper monetary format.
            assert(moneyFormatValidator.test(item.price), `item price '${item.shortDescription}' is invalid`);
        });

        // 'purchaseDate' should be a valid date.
        assert(!isNaN(Date.parse(receipt.purchaseDate)), `purchase date ${receipt.purchaseDate} is invalid`);

        // 'purchaseTime' should be a valid time.
        assert(timeValidator.test(receipt.purchaseTime), `purchase time ${receipt.purchaseTime} is invalid`);
    }
}