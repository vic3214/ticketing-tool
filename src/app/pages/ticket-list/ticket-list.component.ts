import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TicketListMode } from '../../core/enums/TicketListMode.enum';
import { TicketState } from '../../core/enums/TicketState.enum';
import { Employee } from '../../core/interfaces/employee/Employee';
import {
  TicketAssignedInfo,
  TicketLoggedUserInfo,
} from '../../core/interfaces/ticketInfo.ts/TicketInfo';
import { TicketService } from '../../core/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css',
})
export class TicketListComponent implements OnInit {
  private ticketService = inject(TicketService);
  private cookieService = inject(CookieService);

  private loggedUserEmployeeId: number = 0;
  mode: string = TicketListMode.MisTickets;
  ticketLoggedUserInfoList: TicketLoggedUserInfo[] = [];
  ticketAssignedList: TicketAssignedInfo[] = [];

  ngOnInit() {
    const loggedUserData = this.cookieService.get('ticketUser');
    if (loggedUserData !== null) {
      const userData: Employee = JSON.parse(loggedUserData);
      this.loggedUserEmployeeId = userData.employeeId;
      this.getTicketsCreatedByLoggedEmp();
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
    if (this.mode == TicketListMode.MisTickets) {
      this.getTicketsCreatedByLoggedEmp();
    } else {
      this.getAssignedsTicketsToEmployee();
    }
  }

  changeState(state: string, ticketId: number) {
    const ticketOperation =
      state === TicketState.Start
        ? this.ticketService.startTicket(ticketId)
        : this.ticketService.closeTicket(ticketId);

    const successMessage =
      state === TicketState.Start
        ? 'Ticket iniciado correctamente'
        : 'Ticket cerrado correctamente';

    ticketOperation.subscribe({
      next: (res) => {
        if (res.result) {
          alert(successMessage);
          this.refreshTicketList();
        } else {
          alert(res.message);
        }
      },
      error: (error: Error) => {
        alert(`Error al cambiar el estado del ticket: ${error.message}`);
      },
    });
  }

  private refreshTicketList() {
    if (this.mode === TicketListMode.MisTickets) {
      this.getTicketsCreatedByLoggedEmp();
    } else {
      this.getAssignedsTicketsToEmployee();
    }
  }

  private getTicketsCreatedByLoggedEmp() {
    this.ticketService
      .getTicketsCreatedByLoggedEmp(this.loggedUserEmployeeId)
      .subscribe((res) => {
        this.ticketLoggedUserInfoList = res.data;
      });
  }

  private getAssignedsTicketsToEmployee() {
    this.ticketService
      .getAssignedsTicketsToEmployee(this.loggedUserEmployeeId)
      .subscribe((res) => {
        this.ticketAssignedList = res.data;
      });
  }

  get TicketListMode() {
    return TicketListMode;
  }

  get TicketState() {
    return TicketState;
  }
}
