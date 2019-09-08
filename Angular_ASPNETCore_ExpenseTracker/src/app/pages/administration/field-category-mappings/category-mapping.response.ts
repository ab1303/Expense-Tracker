import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";
import { CategoryMapping } from "./types/category-mapping.model";

export interface CategoryMappingApiResponse extends BaseApiResponse {
  categoryMappings: CategoryMapping[];
}
