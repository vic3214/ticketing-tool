import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ParentCategory } from '../../../../core/interfaces/parent-category/ParentCategory';
import { ParentCategoryResponse } from '../../../../core/interfaces/parent-category/ParentCategoryResponse';

@Injectable({
  providedIn: 'root',
})
export class ParentCategoryService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';

  private http = inject(HttpClient);

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
}
