import { ICharacter } from "./ICharacter";

export interface ISWapiResponse<T extends object> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}