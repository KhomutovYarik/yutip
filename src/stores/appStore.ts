import { ICharacter } from "../interfaces/ICharacter";
import { INumberedTableRow } from "../interfaces/INumberedTableRow";
import TableDataStore from "./TableDataStore";

interface ICharacterRow extends ICharacter, INumberedTableRow { };

const appStore = new TableDataStore<ICharacterRow>(
    [
        { text: 'Имя', fieldName: 'name' },
        { text: 'Пол', fieldName: 'gender' },
        { text: 'Год рождения', fieldName: 'birth_year' },
        { text: 'Рост', fieldName: 'height' }
    ],
    Number(process.env.REACT_APP_ROWS_COUNT),
    Number(process.env.REACT_APP_COLUMNS_COUNT)
);

export { appStore };