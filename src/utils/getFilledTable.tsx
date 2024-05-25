import { ICustomTableProps } from "../components/CustomTable";
import { ICustomTableHeader } from "../interfaces/ICustomTableHeader";
import { INumberedTableRow } from "../interfaces/INumberedTableRow";

export function getFilledTable<T extends object>(headers: Array<ICustomTableHeader<T>>, data: Array<T>, uniqueValueField?: keyof T) {
    return data.map((element, index) =>
        <tr key={uniqueValueField ? String(element[uniqueValueField]) : index}>
            {headers.map(({ fieldName }) => <td key={String(fieldName)}>{String(element[fieldName])}</td>)}
        </tr>
    )
}