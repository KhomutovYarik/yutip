import { ICharacter } from "../interfaces/ICharacter";
import { ISWapiResponse } from "../interfaces/ISWapiResponse";

export async function getAppData(setLoader: (value: boolean) => void) {
    setLoader(true);

    const response = await fetch('https://swapi.dev/api/people/');
    const parsedJson: ISWapiResponse<ICharacter> = await response.json();

    setLoader(false);

    return parsedJson.results;
}