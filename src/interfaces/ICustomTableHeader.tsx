import { INumberedTableRow } from "./INumberedTableRow";

export interface ICustomTableHeader<T extends object> {
    text: string;
    fieldName: keyof T;
}