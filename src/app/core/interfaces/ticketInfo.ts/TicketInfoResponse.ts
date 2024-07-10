import { CommonResponse } from '../CommonResponse';
import { TicketAssignedInfo, TicketLoggedUserInfo } from './TicketInfo';

export interface TicketLoggedUserInfoResponse extends CommonResponse {
  data: TicketLoggedUserInfo[];
}

export interface TicketAssignedInfoResponse extends CommonResponse {
  data: TicketAssignedInfo[];
}
