import {v4 as uuidV4} from 'uuid';

/**
 * @returns unique id for receipt.
 */
export function generateId(): string {
    return uuidV4();
}