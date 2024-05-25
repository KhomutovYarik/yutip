import { ICharacter } from "./ICharacter";

export interface IGetCharactersResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<ICharacter>;
}