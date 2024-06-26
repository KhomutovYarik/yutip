import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { ICustomTableHeader } from '../../interfaces/ICustomTableHeader';
import styles from './CustomTable.module.scss';
import { SortOrder } from '../../enums/SortOrder';
import { INumberedTableRow } from '../../interfaces/INumberedTableRow';
import { appStore } from '../../stores/appStore';
import { TableContent } from '../TableContent';
import { EmptyTableContent } from '../EmptyTableContent';

export interface ICustomTableProps<T extends INumberedTableRow> {
    data: T[];
    headers: ICustomTableHeader<T>[];
    uniqueValueFieldName?: keyof T;
    rowsCount: number;
    columnsCount: number;
}

export const CustomTable = observer(<T extends INumberedTableRow>({ headers, data, uniqueValueFieldName, rowsCount, columnsCount }: ICustomTableProps<T>) => {
    const { sortOrder, sortIndex, sortArray } = appStore;

    const sortClassName = data.length > 0 && (sortOrder === SortOrder.ASCENDING ? styles['sorted-asc'] : styles['sorted-desc']);

    return (
        <div className={styles['overflow-element']}>
            <table className={clsx(styles['custom-table'], data.length && styles['custom-table--filled'])}>
                <thead>
                    <tr>
                        {headers.map(({ text, fieldName }, index) =>
                            <th
                                key={String(fieldName)}
                                className={clsx(sortIndex === index && sortClassName)}
                            >
                                <button
                                    onClick={() => sortArray(index)}
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
                        <TableContent headers={headers} data={data} uniqueValueFieldName={uniqueValueFieldName} /> :
                        <EmptyTableContent rowsCount={rowsCount} columnsCount={columnsCount} />
                    }
                </tbody>
            </table>
        </div>
    )
})
