export interface IEmployee {
  employeeId: number;
  employeeName: string;
  deptId: number;
  deptName: string;
  contactNo: string;
  emailId: string;
  role: string;
  gender?: string;
  password?: string;
}

export class Employee implements IEmployee {
  employeeId: number;
  employeeName: string;
  deptId: number;
  deptName: string;
  contactNo: string;
  emailId: string;
  role: string;
  gender: string;
  password: string;

  constructor(
    employeeId?: number,
    employeeName?: string,
    deptId?: number,
    deptName?: string,
    contactNo?: string,
    emailId?: string,
    role?: string,
    gender?: string,
    password?: string
  ) {
    this.employeeId = employeeId ?? 0;
    this.employeeName = employeeName ?? '';
    this.deptId = deptId ?? 0;
    this.deptName = deptName ?? '';
    this.contactNo = contactNo ?? '';
    this.emailId = emailId ?? '';
    this.role = role ?? '';
    this.gender = gender ?? '';
    this.password = password ?? '';
  }
}
