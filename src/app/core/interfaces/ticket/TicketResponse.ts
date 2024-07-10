import { CommonResponse } from '../CommonResponse';
import { Ticket } from './Ticket';

export interface TicketResponse extends CommonResponse {
  data: Ticket[];
}
