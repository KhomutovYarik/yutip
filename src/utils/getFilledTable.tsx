import { ICustomTableHeader } from '../interfaces/ICustomTableHeader';

export function getFilledTable<T extends object>(headers: ICustomTableHeader<T>[], data: T[], uniqueValueField?: keyof T) {
    return data.map((element, index) =>
        <tr
            key={uniqueValueField ? String(element[uniqueValueField]) : index}
        >
            {headers.map(({ fieldName }) => <td key={String(fieldName)}>{String(element[fieldName])}</td>)}
            {/*             <button>Удалить</button> */}
        </tr>
    )
}