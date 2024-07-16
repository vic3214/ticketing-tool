import { CommonResponse } from '../CommonResponse';

export interface LoginResponse extends CommonResponse {
  data: {
    employeeId: number;
    employeeName: string;
    contactNo: string;
    emailId: string;
    deptId: number;
    password: string;
    gender: string;
    role: string;
  } | null;
}
