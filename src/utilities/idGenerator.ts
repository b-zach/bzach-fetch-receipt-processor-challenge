import {v4 as uuidV4} from 'uuid';

/**
 * 
 * @returns todo
 */
export function generateId(): string {
    return uuidV4();
}