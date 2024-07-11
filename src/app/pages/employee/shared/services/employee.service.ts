import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Employee } from '../../../../core/interfaces/employee/Employee';
import { EmployeeResponse } from '../../../../core/interfaces/employee/EmployeeResponse';
import { Role } from '../../../../core/interfaces/role/Role';
import { RoleResponse } from '../../../../core/interfaces/role/RoleResponse';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';
  private http = inject(HttpClient);

  getAllEmployees() {
    return this.http.get<EmployeeResponse>(`${this.apiUrl}GetEmployees`);
  }

  createEmployee(employee: Employee) {
    return this.http.post<EmployeeResponse>(
      `${this.apiUrl}CreateEmployee`,
      employee
    );
  }

  updateEmployee(childCategory: Employee) {
    return this.http.put<EmployeeResponse>(
      `${this.apiUrl}UpdateEmployee`,
      childCategory
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete<EmployeeResponse>(
      `${this.apiUrl}DeleteEmployee?id=${id}`
    );
  }

  getAllRoles() {
    return this.http.get<RoleResponse>(`${this.apiUrl}GetAllRoles`).pipe(
      map((res: RoleResponse) => {
        return res.data.map((role: string) => new Role(role));
      })
    );
  }
}
