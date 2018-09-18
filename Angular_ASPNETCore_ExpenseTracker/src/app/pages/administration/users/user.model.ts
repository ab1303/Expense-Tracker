import { BaseApiResponse } from "../../../shared/model/api-responses/base-api-response";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  location: string;
  groupId: number;
  groupName: string;
  dateCreated: Date;
  // gender: Gender; //TODO;
}

export interface usersApiResponse extends BaseApiResponse {
  userDetails: IUser[];
}
