import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, Observable, of, retry } from 'rxjs';
import { ChildCategory } from '../../core/interfaces/child-category/ChildCategory';
import { ChildCategoryResponse } from '../../core/interfaces/child-category/ChildCategoryResponse';
import { ParentCategory } from '../../core/interfaces/parent-category/ParentCategory';
import { ParentCategoryResponse } from '../../core/interfaces/parent-category/ParentCategoryResponse';
import { ChildCategoryService } from '../../core/services/child-category.service';
import { ParentCategoryService } from '../../core/services/parent-category.service';

@Component({
  selector: 'app-childcategory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './childcategory.component.html',
  styleUrl: './childcategory.component.css',
})
export class ChildcategoryComponent {
  private parentCategoryService = inject(ParentCategoryService);
  private childCategoryService = inject(ChildCategoryService);
  newChildCategory: ChildCategory = new ChildCategory();
  childCategoryList: ChildCategory[] = [];
  parentCategoryList: ParentCategory[] = [];

  ngOnInit(): void {
    forkJoin({
      parentCategorys: this.parentCategoryService
        .getAllParentsCategory()
        .pipe(
          retry(1),
          catchError(
            this.handleError<ParentCategoryResponse>('obtención de categorías')
          )
        ),
      childCategorys: this.childCategoryService
        .getAllChildCategory()
        .pipe(
          retry(1),
          catchError(
            this.handleError<ChildCategoryResponse>(
              'obtención de subcategorías'
            )
          )
        ),
    }).subscribe(({ parentCategorys, childCategorys }) => {
      this.parentCategoryList = parentCategorys.data;
      this.childCategoryList = childCategorys.data;
    });
  }

  handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      alert(`Falló la ${operation}: ${error.message}. Recarga la página.`);
      return of(result as T);
    };
  }
  getAllChildCategory() {
    this.childCategoryService
      .getAllChildCategory()
      .subscribe((res: ChildCategoryResponse) => {
        this.childCategoryList = res.data;
      });
  }

  saveChildCategory() {
    this.childCategoryService
      .createChildCategory(this.newChildCategory)
      .subscribe((res: ChildCategoryResponse) => {
        if (res.result) {
          alert('Categoría creada con éxito');
          this.getAllChildCategory();
        } else {
          alert('Error al crear la categoría: ' + res.message);
        }
      });
  }

  onEdit(childCategory: ChildCategory) {
    this.newChildCategory = childCategory;
  }

  updateChildCategory() {
    this.childCategoryService
      .updateChildCategory(this.newChildCategory)
      .subscribe((res: ChildCategoryResponse) => {
        if (res.result) {
          alert('Categoría actualizada con éxito');
          this.getAllChildCategory();
        } else {
          alert('Error al actualizar la categoría: ' + res.message);
        }
      });
  }

  onDelete(categoryId: number) {
    const isDelete = confirm('¿Estás seguro de eliminar la categoría?');
    if (!isDelete) return;
    this.childCategoryService
      .deleteChildCategory(categoryId)
      .subscribe((res: ChildCategoryResponse) => {
        if (res.result) {
          alert('Categoría eliminada con éxito');
          this.getAllChildCategory();
        } else {
          alert('Error al eliminar la categoría: ' + res.message);
        }
      });
  }
}
