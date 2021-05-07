export declare function exceldateTs<T = number>(excelDate: string | number, done?: (err: Error, unixTs?: number) => T): T;
/**
 * Takes an Excel timestamp (as a number or string) and returns a corresponding Date object
 */
export declare function exceldate<T = Date>(excelDate: string | number, done?: (err: Error, res?: Date) => T): T;
export default exceldate;
