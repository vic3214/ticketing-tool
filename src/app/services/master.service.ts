import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ChildCategory } from '../interfaces/child-category/ChildCategory';
import { ChildCategoryResponse } from '../interfaces/child-category/ChildCategoryResponse';
import { Department } from '../interfaces/departments/Department';
import { DepartmentResponse } from '../interfaces/departments/DepartmentResponse';
import { LoginRequest } from '../interfaces/login/LoginRequest';
import { LoginResponse } from '../interfaces/login/LoginResponse';
import { ParentCategory } from '../interfaces/parent-category/ParentCategory';
import { ParentCategoryResponse } from '../interfaces/parent-category/ParentCategoryResponse';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';

  private http = inject(HttpClient);

  login(obj: LoginRequest) {
    return this.http.post<LoginResponse>(this.apiUrl + 'Login', obj);
  }

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

  getAllParentsCategory() {
    return this.http.get<ParentCategoryResponse>(
      `${this.apiUrl}GetParentCategory`
    );
  }

  createParentCategory(parentCategory: ParentCategory) {
    return this.http.post<ParentCategoryResponse>(
      `${this.apiUrl}CreateParentCategory`,
      parentCategory
    );
  }

  updateParentCategory(parentCategory: ParentCategory) {
    return this.http.put<ParentCategoryResponse>(
      `${this.apiUrl}UpdateParentCategory`,
      parentCategory
    );
  }

  deleteParentCategory(id: number) {
    return this.http.delete<ParentCategoryResponse>(
      `${this.apiUrl}DeleteParentCategory?id=${id}`
    );
  }

  getAllChildCategory() {
    return this.http.get<ChildCategoryResponse>(
      `${this.apiUrl}GetChildCategory`
    );
  }

  createChildCategory(childCategory: ChildCategory) {
    return this.http.post<ChildCategoryResponse>(
      `${this.apiUrl}CreateChildCategory`,
      childCategory
    );
  }

  updateChildCategory(childCategory: ChildCategory) {
    return this.http.put<ChildCategoryResponse>(
      `${this.apiUrl}UpdateChildCategory`,
      childCategory
    );
  }

  deleteChildCategory(id: number) {
    return this.http.delete<ChildCategoryResponse>(
      `${this.apiUrl}DeleteChildCategory?id=${id}`
    );
  }
}
