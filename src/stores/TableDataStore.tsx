import { autorun, makeAutoObservable, runInAction } from "mobx";
import { ICustomTableHeader } from "../interfaces/ICustomTableHeader";
import { INumberedTableRow } from "../interfaces/INumberedTableRow";
import { SortOrder } from "../enums/SortOrder";

const numberedFieldName = 'orderNum';
const localStorageKeyName = 'applicationState';

class TableDataStore<T extends INumberedTableRow> {
    rowsCount: number;
    columnsCount: number;
    tableHeaders: ICustomTableHeader<T>[] = [];
    tableData: T[] = [];
    sortOrder = SortOrder.ASCENDING;
    sortIndex = 0;
    isLoading = false;

    constructor(headers: ICustomTableHeader<T>[], rowsCount: number = 10, columnsCount: number = 5) {
        makeAutoObservable(this);
        this.rowsCount = rowsCount;
        this.columnsCount = columnsCount;

        const stateFromLocalStorage = window.localStorage.getItem(localStorageKeyName);

        if (stateFromLocalStorage) {
            const stateObject = JSON.parse(stateFromLocalStorage);
            this.tableHeaders = stateObject.headers;
            this.tableData = stateObject.data;
            this.sortOrder = stateObject.sortOrder;
            this.sortIndex = stateObject.sortIndex;

        } else {
            this.tableHeaders = headers;
            this.decorateTableHeaders();
        }

        autorun(() => {
            this.saveStateToLocalStorage();
        })
    }

    getTableData = async () => {
        try {
            this.isLoading = true;

            const response = await fetch('https://swapi.dev/api/people/');
            const parsedJson = await response.json();

            runInAction(() => {
                this.tableData = parsedJson.results;
                this.decorateTableData();
                this.isLoading = false;
            })
        } catch {
            this.isLoading = false;
        }
    }

    clearTableData = () => {
        this.tableData = [];
    }

    sortArray = (sortIndex: number) => {
        if (this.sortOrder === SortOrder.ASCENDING) {
            this.sortOrder = SortOrder.DESCENDING;
        } else {
            this.sortOrder = SortOrder.ASCENDING;
        }

        this.sortIndex = sortIndex;

        this.tableData.sort((a, b) => {
            const firstElementFieldValue = a[this.tableHeaders[sortIndex].fieldName];
            const secondElementFieldValue = b[this.tableHeaders[sortIndex].fieldName];

            if (typeof firstElementFieldValue === 'number' && typeof secondElementFieldValue === 'number') {
                return this.sortOrder === SortOrder.ASCENDING ?
                    firstElementFieldValue - secondElementFieldValue :
                    secondElementFieldValue - firstElementFieldValue;
            } else {
                return this.sortOrder === SortOrder.ASCENDING ?
                    String(firstElementFieldValue).localeCompare(String(secondElementFieldValue)) :
                    String(secondElementFieldValue).localeCompare(String(firstElementFieldValue));
            }
        });
    }

    removeElement = (elementIndex: number) => {
        this.tableData = this.tableData.filter((_, index) => index !== elementIndex);
    }

    private decorateTableHeaders = () => {
        const numberedHeader: ICustomTableHeader<INumberedTableRow> = { text: '№', fieldName: numberedFieldName };

        const slicedHeaders = this.tableHeaders.slice(0, this.columnsCount - 1);
        slicedHeaders.unshift(numberedHeader);

        this.tableHeaders = slicedHeaders;
    }

    private decorateTableData = () => {
        const slicedData = this.tableData.slice(0, this.rowsCount);
        slicedData.forEach((element, index) => element[numberedFieldName] = index + 1);

        this.tableData = slicedData;
    }

    private saveStateToLocalStorage = () => {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify({
            headers: this.tableHeaders,
            data: this.tableData,
            sortOrder: this.sortOrder,
            sortIndex: this.sortIndex
        }));
    }
}

export default TableDataStore;