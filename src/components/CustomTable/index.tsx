import clsx from 'clsx';
import { ICustomTableHeader } from '../../interfaces/ICustomTableHeader';
import { getEmptyTable } from '../../utils/getEmptyTable';
import { getFilledTable } from '../../utils/getFilledTable';
import styles from './CustomTable.module.scss';
import { useState } from 'react';
import { SortOrder } from '../../enums/SortOrder';
import { INumberedTableRow } from '../../interfaces/INumberedTableRow';

export interface ICustomTableProps<T extends INumberedTableRow> {
    data: Array<T>;
    headers: Array<ICustomTableHeader<T>>;
    uniqueValueFieldName?: keyof T;
    rowsCount: number;
    columnsCount: number;
}

export function CustomTable<T extends object>({ headers, data, uniqueValueFieldName, rowsCount, columnsCount }: ICustomTableProps<T>) {
    const [sortedHeaderIndex, setSortedHeaderIndex] = useState(0);
    const [sortOrder, setSortOrder] = useState(SortOrder.ASCENDING);

    const sortClassName = data.length > 0 && (sortOrder === SortOrder.ASCENDING ? styles['sorted-asc'] : styles['sorted-desc']);

    const changeSortOrder = (index: number) => {
        if (sortOrder === SortOrder.ASCENDING) {
            setSortOrder(SortOrder.DESCENDING);
        } else {
            setSortOrder(SortOrder.ASCENDING);
        }

        setSortedHeaderIndex(index);
    }

    const sortAlgorithm = (a: T, b: T) => {
        const firstElementFieldValue = a[headers[sortedHeaderIndex].fieldName];
        const secondElementFieldValue = b[headers[sortedHeaderIndex].fieldName];

        if (typeof firstElementFieldValue === 'number' && typeof secondElementFieldValue === 'number') {
            return sortOrder === SortOrder.ASCENDING ?
                firstElementFieldValue - secondElementFieldValue :
                secondElementFieldValue - firstElementFieldValue;
        } else {
            return sortOrder === SortOrder.ASCENDING ?
                String(firstElementFieldValue).localeCompare(String(secondElementFieldValue)) :
                String(secondElementFieldValue).localeCompare(String(firstElementFieldValue));
        }
    }

    const sortedData = ([...data]).sort(sortAlgorithm);

    return (
        <table className={clsx(styles['custom-table'], data.length && styles['custom-table--filled'])}>
            <thead>
                <tr>
                    {headers.map(({ text, fieldName }, index) =>
                        <th
                            key={String(fieldName)}
                            className={clsx(sortedHeaderIndex === index && sortClassName)}
                        >
                            <button
                                onClick={() => changeSortOrder(index)}
                                disabled={Boolean(data.length === 0)}
                            >
                                {text}
                            </button>
                        </th>)
                    }
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ?
                    getFilledTable(headers, sortedData, uniqueValueFieldName) :
                    getEmptyTable(rowsCount, columnsCount)
                }
            </tbody>
        </table>
    )
}
