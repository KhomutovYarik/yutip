import { observer } from 'mobx-react-lite';
import { ICustomTableHeader } from "../../interfaces/ICustomTableHeader";
import { INumberedTableRow } from "../../interfaces/INumberedTableRow";
import { appStore } from '../../stores/appStore';
import { Button } from '../UI/Button';
import styles from './TableContent.module.scss';

interface ITableContentProps<T extends INumberedTableRow> {
    headers: ICustomTableHeader<T>[];
    data: T[];
    uniqueValueFieldName?: keyof T;
}

export const TableContent = observer(<T extends INumberedTableRow>({ headers, data, uniqueValueFieldName }: ITableContentProps<T>) => {
    const { removeElement } = appStore;

    return (
        <>
            {data.map((element, index) =>
                <tr
                    key={uniqueValueFieldName ? String(element[uniqueValueFieldName]) : index}
                >
                    {headers.map(({ fieldName }) =>
                        <td
                            key={String(fieldName)}
                        >
                            {String(element[fieldName])}
                        </td>)
                    }
                    <td>
                        <Button
                            onClick={() => removeElement(index)}
                            className={styles['remove-row-button']}
                            label='Удалить'
                        />
                    </td>
                </tr>
            )}
        </>
    )
})