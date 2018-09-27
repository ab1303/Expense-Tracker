import { BaseApiResponse } from './base-api-response';


export interface GenericBaseApiResponse<T> extends BaseApiResponse {
    model: T
}