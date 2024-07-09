import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Employee } from '../interfaces/employee/Employee';
import { EmployeeResponse } from '../interfaces/employee/EmployeeResponse';
import { Roles } from '../interfaces/roles/Roles';
import { RolesResponse } from '../interfaces/roles/RolesResponse';

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
    return this.http.get<RolesResponse>(`${this.apiUrl}GetAllRoles`).pipe(
      map((res: RolesResponse) => {
        return res.data.map((role: string) => new Roles(role));
      })
    );
  }
}
