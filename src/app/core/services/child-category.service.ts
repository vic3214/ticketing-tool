import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ChildCategory } from '../interfaces/child-category/ChildCategory';
import { ChildCategoryResponse } from '../interfaces/child-category/ChildCategoryResponse';

@Injectable({
  providedIn: 'root',
})
export class ChildCategoryService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';

  private http = inject(HttpClient);
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
