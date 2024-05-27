import { observer } from 'mobx-react-lite';
import { Button } from '../UI/Button';
import styles from './Pagination.module.scss';
import { appStore } from '../../stores/appStore';
import { ArrowIcon } from '../Icons/ArrowIcon';
import { ArrowIconDirections } from '../../enums/ArrowIconDirections';

interface IPaginationProps {
    currentPage: number;
    totalPages: number;
}

export const Pagination = observer(({ currentPage, totalPages }: IPaginationProps) => {
    const { getTableData } = appStore;

    if (totalPages === 1 || totalPages === 0) {
        return null;
    }

    const pageNumbersArray = [];
    let pageCounter, lastPaginationNumber;

    if (currentPage < 4) {
        pageCounter = 1;
        lastPaginationNumber = totalPages < 5 ? totalPages : 5;
    } else if (totalPages - currentPage < 2) {
        pageCounter = totalPages - 4;
        if (pageCounter === 0) {
            pageCounter = 1;
        }
        lastPaginationNumber = totalPages;
    } else {
        pageCounter = currentPage - 2;
        lastPaginationNumber = currentPage + 2;
    }

    while (pageCounter <= lastPaginationNumber) {
        pageNumbersArray.push(pageCounter);
        pageCounter++;
    }

    return (
        <div className={styles['pagination']}>
            <button
                className={styles['next-prev-button']}
                disabled={currentPage === 1}
                onClick={() => getTableData(currentPage - 1)}
            >
                <ArrowIcon />
            </button>
            {pageNumbersArray.map(element =>
                <Button
                    key={element}
                    label={String(element)}
                    onClick={() => getTableData(element)}
                    disabled={currentPage === element}
                />
            )}
            <button
                className={styles['next-prev-button']}
                disabled={currentPage === totalPages}
                onClick={() => getTableData(currentPage + 1)}
            >
                <ArrowIcon
                    direction={ArrowIconDirections.RIGHT}
                />
            </button>
        </div>
    )
})