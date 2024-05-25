import { ICustomTableHeader } from "../../../interfaces/ICustomTableHeader";
import { INumberedTableRow } from "../../../interfaces/INumberedTableRow";
import { CustomTable, ICustomTableProps } from "../../CustomTable";

const orderedFieldName = 'orderNum';

export function TableDecorator<T extends INumberedTableRow>({ headers, data, uniqueValueFieldName, rowsCount, columnsCount }: ICustomTableProps<T>) {
    const numberedHeader: ICustomTableHeader<INumberedTableRow> = { text: '№', fieldName: orderedFieldName };

    const slicedHeaders = headers.slice(0, columnsCount - 1);
    slicedHeaders.unshift(numberedHeader);

    const slicedData = data.slice(0, rowsCount);
    slicedData.forEach((element, index) => element[orderedFieldName] = index + 1);

    return (
        <CustomTable
            headers={slicedHeaders}
            data={slicedData}
            uniqueValueFieldName={uniqueValueFieldName}
            rowsCount={rowsCount}
            columnsCount={columnsCount}
        />
    )
}