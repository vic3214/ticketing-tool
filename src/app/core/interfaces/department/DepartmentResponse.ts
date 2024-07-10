import { CommonResponse } from '../CommonResponse';
import { Department } from './Department';

export interface DepartmentResponse extends CommonResponse {
  data: Department[];
}
