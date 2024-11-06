/**
 * Global API response wrapper.
 * 
 * Takes in a Type(model) which defines the return data type.
 */
export interface IHttpResponseWrapper<TType> {
    data: TType;
    currentPage: number;
    status: number;
    success: boolean;
    message: string;
    totalPages: number;
    totalRecords: number;
    errors: any[];
}