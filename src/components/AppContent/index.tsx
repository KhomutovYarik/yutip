import { Button } from '../../components/UI/Button';
import { getAppData } from '../../utils/getAppData';
import { useState } from 'react';
import { ICharacter } from '../../interfaces/ICharacter';
import styles from './AppContent.module.scss';
import { TableDecorator } from '../HOC/TableDecorator';
import { INumberedTableRow } from '../../interfaces/INumberedTableRow';
import { PreloaderModal } from '../PreloaderModal';

type ICharacterRow = ICharacter & INumberedTableRow;

export function AppContent() {
    const [tableData, setTableData] = useState<Array<ICharacterRow>>([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <section className={styles['app-content']}>
            <div className={styles['app-content__wrapper']}>
                <h1>Персонажи "Звёздных войн"</h1>
                <TableDecorator
                    headers={[
                        { text: 'Имя', fieldName: 'name' },
                        { text: 'Пол', fieldName: 'gender' },
                        { text: 'Год рождения', fieldName: 'birth_year' },
                        { text: 'Рост', fieldName: 'height' }
                    ]}
                    data={tableData}
                    uniqueValueFieldName='url'
                    rowsCount={10}
                    columnsCount={5}
                />
                <div className={styles['app-content__footer-buttons']}>
                    <Button
                        label='Загрузить данные'
                        onClick={() => getAppData(setIsLoading)
                            .then(data => setTableData(data))}
                    />
                    <Button
                        label='Очистить данные'
                        onClick={() => setTableData([])}
                    />
                </div>
            </div>
            {isLoading && <PreloaderModal />}
        </section>
    )
}
