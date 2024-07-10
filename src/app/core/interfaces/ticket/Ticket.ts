export interface ITicket {
  employeeId: number;
  severity: string;
  childCategoryId: number;
  deptId: number;
  requestDetails: string;
}

export class Ticket implements ITicket {
  employeeId: number;
  severity: string;
  childCategoryId: number;
  deptId: number;
  requestDetails: string;

  constructor(
    employeeId?: number,
    severity?: string,
    childCategoryId?: number,
    deptId?: number,
    requestDetails?: string
  ) {
    this.employeeId = employeeId ?? 0;
    this.severity = severity ?? '';
    this.childCategoryId = childCategoryId ?? 0;
    this.deptId = deptId ?? 0;
    this.requestDetails = requestDetails ?? '';
  }
}
