import { Button } from '../../components/UI/Button';
import styles from './AppContent.module.scss';
import { PreloaderModal } from '../../components/Modals/PreloaderModal';
import { appStore } from '../../stores/appStore';
import { observer } from 'mobx-react-lite';
import { CustomTable } from '../../components/CustomTable';
import { Pagination } from '../../components/Pagination';
import { Link } from 'react-router-dom';

export const AppContent = observer(() => {
    const {
        tableData,
        tableHeaders,
        currentPage,
        totalPages,
        isLoading,
        getTableData,
        clearTableData
    } = appStore;

    return (
        <section className={styles['app-content']}>
            <div className='container'>
                <div className={styles['wrapper']}>
                    <h1 className={styles['title']}>Персонажи "Звёздных войн"</h1>
                    <div className={styles['table-with-pagination']}>
                        <CustomTable
                            headers={tableHeaders}
                            data={tableData}
                            uniqueValueFieldName='url'
                            rowsCount={Number(process.env.REACT_APP_ROWS_COUNT)}
                            columnsCount={Number(process.env.REACT_APP_COLUMNS_COUNT)}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                    </div>
                    <div className={styles['footer-buttons']}>
                        <Link to='/add-row'>
                            <Button
                                label='Добавить запись'
                            />
                        </Link>
                        <Button
                            label='Загрузить данные'
                            onClick={() => getTableData()}
                        />
                        <Button
                            label='Очистить данные'
                            onClick={() => clearTableData()}
                        />
                    </div>
                </div>
            </div>
            {isLoading && <PreloaderModal />}
        </section>
    )
})
