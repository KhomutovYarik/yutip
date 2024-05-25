import clsx from 'clsx';
import { ICustomTableHeader } from '../../interfaces/ICustomTableHeader';
import { getEmptyTable } from '../../utils/getEmptyTable';
import { getFilledTable } from '../../utils/getFilledTable';
import styles from './CustomTable.module.scss';

export interface ICustomTableProps<T extends object> {
    data: Array<T>;
    headers: Array<ICustomTableHeader<T>>;
    uniqueValueFieldName?: keyof T;
    rowsCount: number;
    columnsCount: number;
}

export function CustomTable<T extends object>({ headers, data, uniqueValueFieldName, rowsCount, columnsCount }: ICustomTableProps<T>) {
    const slicedHeaders = headers.slice(0, columnsCount - 1);
    const slicedData = data.slice(0, rowsCount);

    return (
        <table className={clsx(styles['custom-table'], slicedData.length && styles['custom-table--filled'])}>
            <thead>
                <tr>
                    <th>№</th>
                    {slicedHeaders.map(({ text, fieldName }) => <th key={String(fieldName)}>{text}</th>)}
                </tr>
            </thead>
            <tbody>
                {slicedData.length > 0 ?
                    getFilledTable(slicedHeaders, slicedData, uniqueValueFieldName) :
                    getEmptyTable(rowsCount, columnsCount)
                }
            </tbody>
        </table>
    )
}
