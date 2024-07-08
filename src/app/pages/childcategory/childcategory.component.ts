import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChildCategory } from '../../interfaces/child-category/ChildCategory';
import { ChildCategoryResponse } from '../../interfaces/child-category/ChildCategoryResponse';
import { ParentCategory } from '../../interfaces/parent-category/ParentCategory';
import { ParentCategoryResponse } from '../../interfaces/parent-category/ParentCategoryResponse';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-childcategory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './childcategory.component.html',
  styleUrl: './childcategory.component.css',
})
export class ChildcategoryComponent {
  private masterService = inject(MasterService);
  newChildCategory: ChildCategory = new ChildCategory();
  childCategoryList: ChildCategory[] = [];
  parentCategoryList: ParentCategory[] = [];

  ngOnInit(): void {
    this.getAllParentsCategory();
    this.getAllChildCategory();
  }

  getAllChildCategory() {
    this.masterService
      .getAllChildCategory()
      .subscribe((res: ChildCategoryResponse) => {
        this.childCategoryList = res.data;
      });
  }

  getAllParentsCategory() {
    this.masterService
      .getAllParentsCategory()
      .subscribe((res: ParentCategoryResponse) => {
        this.parentCategoryList = res.data;
      });
  }

  saveChildCategory() {
    this.masterService
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
    this.masterService
      .updateChildCategory(this.newChildCategory)
      .subscribe((res: ChildCategoryResponse) => {
        if (res.result) {
          alert('Categoría actualizada con éxito');
          this.getAllChildCategory();
        } else {
          alert('Error al crear la categoría: ' + res.message);
        }
      });
  }

  onDelete(categoryId: number) {
    const isDelete = confirm('¿Estás seguro de eliminar la categoría?');
    if (!isDelete) return;
    this.masterService
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
