import {Receipt, Item} from '../schema';

export class PointCalculator {
    /**
     * Sums up the points based on the given set of rules.
     * This calculator assumes the receipt is valid.
     * @param receipt 
     * @returns number of points
     */
    public calculatePoints(receipt: Receipt): number {
        let points = 0;
        const totalPaid: number = parseFloat(receipt.total);
        const purchaseDate: Date = new Date(receipt.purchaseDate);

        // Grant one point for every alphanumeric character in the retailer name.
        points += this.getRetailerNamePoints(receipt.retailer);

        // Grant 50 points if the total is a round dollar amount.
        points += totalPaid % 1 === 0 ? 50 : 0;

        // Grant 25 points if the total is a multiple of 0.25.
        points += totalPaid % 0.25 === 0 ? 25 : 0;

        // Grant 5 points for every two items on the receipt.
        points += Math.floor(receipt.items.length / 2) * 5;

        // Grant points based on trimmed length of item descriptions.
        points += this.getPointsFromItemDescriptions(receipt.items);

        // Grant 6 points if the day in the purchase date is odd.
        points += purchaseDate.getDate() % 2 === 0 ? 0 : 6;

        // Grant 10 points if the time of purchase is after 2pm (inclusive) and before 4pm (exclusive).
        points += this.getPointsByPurchaseTime(receipt.purchaseTime);

        return points;
    }

    private getRetailerNamePoints(retailer: string): number {
        const matchedCharacters: RegExpMatchArray | null = retailer.match(/[a-zA-Z0-9]/g);
        return matchedCharacters?.length ?? 0;
    }

    private getPointsFromItemDescriptions(items: Item[]): number {
        let total = 0;

        items.forEach((item: Item) => {
            if (item.shortDescription.trim().length % 3 === 0) {
                total += Math.ceil(parseFloat(item.price) * 0.2);
            }
        });

        return total;
    }

    private getPointsByPurchaseTime(purchaseTime: string): number {
        const purchaseHour = parseInt(purchaseTime.split(':')[0]!);
        return purchaseHour >= 14 && purchaseHour < 16 ? 10 : 0;
    }
}