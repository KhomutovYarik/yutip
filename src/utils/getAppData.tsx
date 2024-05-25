import { IGetCharactersResponse } from "../interfaces/IGetCharactersResponse";

export async function getAppData() {
    const response = await fetch('https://swapi.dev/api/people/');
    const parsedJson: IGetCharactersResponse = await response.json();

    return parsedJson.results;
}