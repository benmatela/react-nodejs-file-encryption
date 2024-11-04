/**
 * Global API response wrapper.
 * 
 * Takes in a type(model) which defines the return data type.
 */
export interface IHttpResponseWrapper<Ttype> {
    data: Ttype;
    currentPage: number;
    status: number;
    success: boolean;
    message: string;
    totalPages: number;
    totalRecords: number;
    errors: any[];
}