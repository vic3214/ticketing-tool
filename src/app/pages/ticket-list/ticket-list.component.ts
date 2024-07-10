import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TicketListMode } from '../../core/enums/TicketListMode.enum';
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

  mode: string = TicketListMode.MisTickets;
  loggedUserEmployeeId: number = 0;
  ticketLoggedUserInfoList: TicketLoggedUserInfo[] = [];
  ticketAssignedList: TicketAssignedInfo[] = [];

  ngOnInit() {
    const loggedUserData = this.cookieService.get('ticketUser');
    if (loggedUserData !== null) {
      const userData: Employee = JSON.parse(loggedUserData);
      this.loggedUserEmployeeId = userData.employeeId;
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
    if (this.mode == TicketListMode.MisTickets) {
      this.ticketService
        .getTicketsCreatedByLoggedEmp(this.loggedUserEmployeeId)
        .subscribe((res) => {
          this.ticketLoggedUserInfoList = res.data;
        });
    } else {
      this.ticketService
        .getAssignedsTicketsToEmployee(this.loggedUserEmployeeId)
        .subscribe((res) => {
          this.ticketAssignedList = res.data;
        });
    }
  }

  get TicketListMode() {
    return TicketListMode;
  }
}
