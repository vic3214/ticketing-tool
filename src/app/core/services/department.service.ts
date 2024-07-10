import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Department } from '../interfaces/department/Department';
import { DepartmentResponse } from '../interfaces/department/DepartmentResponse';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';
  private http = inject(HttpClient);

  getAllDepartments() {
    return this.http.get<DepartmentResponse>(`${this.apiUrl}GetDepartments`);
  }

  createDepartment(department: Department) {
    return this.http.post<DepartmentResponse>(
      `${this.apiUrl}CreateDepartment`,
      department
    );
  }

  updateDepartment(department: Department) {
    return this.http.put<DepartmentResponse>(
      `${this.apiUrl}UpdateDepartment`,
      department
    );
  }

  deleteDepartment(id: number) {
    return this.http.delete<DepartmentResponse>(
      `${this.apiUrl}DeleteDepartment?id=${id}`
    );
  }
}
