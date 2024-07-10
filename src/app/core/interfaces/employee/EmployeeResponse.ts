import { CommonResponse } from '../CommonResponse';
import { Employee } from './Employee';

export interface EmployeeResponse extends CommonResponse {
  data: Employee[];
}
