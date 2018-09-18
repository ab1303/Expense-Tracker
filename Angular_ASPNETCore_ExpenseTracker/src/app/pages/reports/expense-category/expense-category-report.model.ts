import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";


interface GroupedTotalDTO {
    groupingName: string;
    groupingTotal: number;
}

export interface ReportGroupDTO {
    category: GroupedTotalDTO;
    subCategories: ReportGroupDTO[];
}


export interface ExpenseCategoryReportApiResponse extends BaseApiResponse {
    expenseReportGroups: ReportGroupDTO[];
  }
  