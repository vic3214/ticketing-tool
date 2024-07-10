export interface ITicketAssignedInfo {
  ticketId: number;
  createdDate: Date;
  expectedEndDate: Date;
  state: string;
  severity: string;
  contactNo: string;
  ticketNo: string;
  deptName: string;
  createdByEmployee: string;
  assignedToEmployee: string;
  completedDate: Date;
  parentCategoryName: string;
  childCategoryName: string;
}

export interface ITicketLoggedUserInfo {
  ticketId: number;
  createdDate: Date;
  expectedEndDate: Date;
  state: string;
  severity: string;
  contactNo: string;
  ticketNo: string;
  deptName: string;
  createdByEmployee: string;
  assignedToEmployee: string;
  completedDate: Date;
  childCategory: string;
  parentCategory: string;
}

export class TicketInfo {
  ticketId: number;
  createdDate: Date;
  expectedEndDate: Date;
  state: string;
  severity: string;
  contactNo: string;
  ticketNo: string;
  deptName: string;
  createdByEmployee: string;
  assignedToEmployee: string;
  completedDate: Date;
  constructor(
    ticketId?: number,
    createdDate?: Date,
    expectedEndDate?: Date,
    state?: string,
    severity?: string,
    contactNo?: string,
    ticketNo?: string,
    deptName?: string,
    createdByEmployee?: string,
    assignedToEmployee?: string,
    completedDate?: Date
  ) {
    this.ticketId = ticketId ?? 0;
    this.createdDate = createdDate ?? new Date();
    this.expectedEndDate = expectedEndDate ?? new Date();
    this.state = state ?? '';
    this.severity = severity ?? '';
    this.contactNo = contactNo ?? '';
    this.ticketNo = ticketNo ?? '';
    this.deptName = deptName ?? '';
    this.createdByEmployee = createdByEmployee ?? '';
    this.assignedToEmployee = assignedToEmployee ?? '';
    this.completedDate = completedDate ?? new Date();
  }
}

export class TicketAssignedInfo
  extends TicketInfo
  implements ITicketAssignedInfo
{
  parentCategoryName: string;
  childCategoryName: string;

  constructor(parentCategoryName?: string, childCategoryName?: string) {
    super();
    this.parentCategoryName = parentCategoryName ?? '';
    this.childCategoryName = childCategoryName ?? '';
  }
}

export class TicketLoggedUserInfo
  extends TicketInfo
  implements ITicketLoggedUserInfo
{
  childCategory: string;
  parentCategory: string;

  constructor(childCategory?: string, parentCategory?: string) {
    super();
    this.childCategory = childCategory ?? '';
    this.parentCategory = parentCategory ?? '';
  }
}
