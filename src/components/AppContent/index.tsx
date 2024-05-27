import { Button } from '../../components/UI/Button';
import styles from './AppContent.module.scss';
import { PreloaderModal } from '../Modals/PreloaderModal';
import { appStore } from '../../stores/appStore';
import { observer } from 'mobx-react-lite';
import { CustomTable } from '../CustomTable';
import { Pagination } from '../Pagination';

const rowsCount = 10;
const columnsCount = 5;

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
            <div className={styles['app-content__wrapper']}>
                <h1>Персонажи "Звёздных войн"</h1>
                <div className={styles['app-content__table-with-pagination']}>
                    <CustomTable
                        headers={tableHeaders}
                        data={tableData}
                        uniqueValueFieldName='url'
                        rowsCount={rowsCount}
                        columnsCount={columnsCount}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                </div>
                <div className={styles['app-content__footer-buttons']}>
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
            {isLoading && <PreloaderModal />}
        </section>
    )
})
