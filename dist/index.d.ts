export declare function getExcelEpoch(): Date;
export declare function getExcelDelta(): number;
export declare type IExcelDateNumberInput = string | number;
export declare function validDateNumber(excelDateNumber: number): excelDateNumber is number;
export declare function excelDateNumber(excelDate: IExcelDateNumberInput): number;
/**
 * Convert input to a number
 */
export declare function excelDateNumberToTs(excelDate: IExcelDateNumberInput): number;
export declare function ts2excel(milliseconds: number): number;
export declare function date2excel(date: Date): number;
/**
 * Convert input to JS Date
 * Details here (mostly in comments): https://gist.github.com/christopherscott/2782634
 *
 * @link https://gist.github.com/christopherscott/2782634
 */
export declare function exceldateTs<T = number>(excelDate: IExcelDateNumberInput, done?: (err: Error, unixTs?: number) => T): T;
/**
 * Takes an Excel timestamp (as a number or string) and returns a corresponding Date object
 */
export declare function exceldate<T = Date>(excelDate: IExcelDateNumberInput, done?: (err: Error, res?: Date) => T): T;
export default exceldate;
