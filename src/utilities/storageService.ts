import {generateId} from './idGenerator';

export class StorageService {
    constructor(private readonly receipts: { [key: string]: number } = {}) {}

    /**
     * Store the points and generate an id for the receipt.
     * 
     * @param receipt
     * @returns id generated for the given receipt.
     */
    public storePoints(points: number): string {
        const id = generateId();
        this.receipts[id] = points;
        return id;
    }

    /**
     * Retrieve the points for a given id.
     * 
     * @param id 
     * @throws Error if no receipt found for id.
     * @returns points belonging to id.
     */
    public getPoints(id: string): number {
        const points = this.receipts[id];

        if (points === undefined) {
            throw new Error(`No receipt found for id ${id}`);
        }

        return this.receipts[id]!;
    }
}