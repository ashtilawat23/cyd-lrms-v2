export type ApiResponse<T> = {
    data: T;
    error?: string;
  };
  
  export type PaginationData = {
    page: number;
    perPage: number;
    totalCount: number;
  };
  
  export type PaginatedApiResponse<T> = ApiResponse<T> & PaginationData;