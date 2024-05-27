import { observer } from 'mobx-react-lite';
import { ICustomTableHeader } from "../../interfaces/ICustomTableHeader";
import { INumberedTableRow } from "../../interfaces/INumberedTableRow";
import { appStore } from '../../stores/appStore';
import { Button } from '../UI/Button';
import styles from './TableContent.module.scss';
import { useState } from 'react';
import { ConfirmModal } from '../Modals/ConfirmModal';

interface ITableContentProps<T extends INumberedTableRow> {
    headers: ICustomTableHeader<T>[];
    data: T[];
    uniqueValueFieldName?: keyof T;
}

export const TableContent = observer(<T extends INumberedTableRow>({ headers, data, uniqueValueFieldName }: ITableContentProps<T>) => {
    const { removeElement } = appStore;
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [removableIndex, setRemovableIndex] = useState<number | null>(null);

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
                            onClick={() => {
                                setIsModalOpened(true);
                                setRemovableIndex(index);
                            }}
                            className={styles['remove-row-button']}
                            label='Удалить'
                        />
                    </td>
                </tr>
            )}
            {isModalOpened &&
                <ConfirmModal
                    label='Удалить элемент?'
                    confirmAction={() => removeElement(Number(removableIndex))}
                    closeModal={() => setIsModalOpened(false)}
                />}
        </>
    )
})