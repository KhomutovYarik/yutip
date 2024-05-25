import { IGetCharactersResponse } from "../interfaces/IGetCharactersResponse";

export async function getAppData(setLoader: (value: boolean) => void) {
    setLoader(true);

    const response = await fetch('https://swapi.dev/api/people/');
    const parsedJson: IGetCharactersResponse = await response.json();

    setLoader(false);

    return parsedJson.results;
}