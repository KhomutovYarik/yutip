import { autorun, makeAutoObservable, runInAction } from "mobx";
import { ICustomTableHeader } from "../interfaces/ICustomTableHeader";
import { INumberedTableRow } from "../interfaces/INumberedTableRow";
import { SortOrder } from "../enums/SortOrder";
import { ISWapiResponse } from "../interfaces/ISWapiResponse";

const numberedFieldName = 'orderNum';
const localStorageKeyName = 'applicationState';

class TableDataStore<T extends INumberedTableRow> {
    rowsCount: number;
    columnsCount: number;
    tableHeaders: ICustomTableHeader<T>[] = [];
    tableData: T[] = [];
    sortOrder = SortOrder.ASCENDING;
    sortIndex = 0;
    currentPage: number = 1;
    totalPages: number = 1;
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
            this.currentPage = stateObject.currentPage;
            this.totalPages = stateObject.totalPages;

        } else {
            this.tableHeaders = headers;
            this.decorateTableHeaders();
        }

        autorun(() => {
            this.saveStateToLocalStorage();
        })
    }

    getTableData = async (pageNumber: number = 1) => {
        try {
            this.isLoading = true;

            const response = await fetch(`${process.env.REACT_APP_API_URL}?page=${pageNumber}`);
            const parsedJson: ISWapiResponse<T> = await response.json();

            runInAction(() => {
                this.tableData = parsedJson.results;
                this.currentPage = pageNumber;
                this.totalPages = Math.ceil(parsedJson.count / this.rowsCount);
                this.decorateTableData();
                this.isLoading = false;
            })
        } catch {
            this.isLoading = false;
        }
    }

    clearTableData = () => {
        this.tableData = [];
        this.totalPages = 1;
        this.currentPage = 1;
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

    addElement = (newElement: T) => {
        newElement[numberedFieldName] = this.tableData.length + 1;
        this.tableData.push(newElement);
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
        slicedData.forEach((element, index) => {
            element[numberedFieldName] = index + 1 + (this.currentPage - 1) * this.rowsCount;
        });

        this.tableData = slicedData;
    }

    private saveStateToLocalStorage = () => {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify({
            headers: this.tableHeaders,
            data: this.tableData,
            sortOrder: this.sortOrder,
            sortIndex: this.sortIndex,
            currentPage: this.currentPage,
            totalPages: this.totalPages
        }));
    }
}

export default TableDataStore;