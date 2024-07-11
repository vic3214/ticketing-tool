import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TicektActionResponse } from '../interfaces/ticket-action/TicketActionResponse';
import { Ticket } from '../interfaces/ticket/Ticket';
import { TicketResponse } from '../interfaces/ticket/TicketResponse';
import {
  TicketAssignedInfoResponse,
  TicketLoggedUserInfoResponse,
} from '../interfaces/ticketInfo.ts/TicketInfoResponse';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';
  private http = inject(HttpClient);

  createTicket(ticket: Ticket) {
    return this.http.post<TicketResponse>(
      `${this.apiUrl}CreateNewTicket`,
      ticket
    );
  }

  getTicketsCreatedByLoggedEmp(employeeId: number) {
    return this.http.get<TicketLoggedUserInfoResponse>(
      `${this.apiUrl}GetTicketsCreatedByEmpId?empId=${employeeId}`
    );
  }

  getAssignedsTicketsToEmployee(employeeId: number) {
    return this.http.get<TicketAssignedInfoResponse>(
      `${this.apiUrl}GetAssignedTicketsByEmpId?empId=${employeeId}`
    );
  }

  startTicket(ticketId: number) {
    return this.http.post<TicektActionResponse>(
      `${this.apiUrl}startTicket?id=${ticketId}`,
      {}
    );
  }

  closeTicket(ticketId: number) {
    return this.http.post<TicektActionResponse>(
      `${this.apiUrl}closeTicket?id=${ticketId}`,
      {}
    );
  }
}
