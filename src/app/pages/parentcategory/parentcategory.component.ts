import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Department } from '../../core/interfaces/department/Department';
import { DepartmentResponse } from '../../core/interfaces/department/DepartmentResponse';
import { ParentCategory } from '../../core/interfaces/parent-category/ParentCategory';
import { ParentCategoryResponse } from '../../core/interfaces/parent-category/ParentCategoryResponse';
import { DepartmentService } from '../../core/services/department.service';
import { ParentCategoryService } from '../../core/services/parent-category.service';

@Component({
  selector: 'app-parentcategory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './parentcategory.component.html',
  styleUrl: './parentcategory.component.css',
})
export class ParentcategoryComponent {
  private parentCategoryService = inject(ParentCategoryService);
  private departmentService = inject(DepartmentService);
  parentCategoryList: ParentCategory[] = [];
  newParentCategory: ParentCategory = new ParentCategory();
  gridList: Department[] = [];
  departmentList: Department[] = [];

  ngOnInit(): void {
    this.getAllParentsCategory();
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.departmentService
      .getAllDepartments()
      .subscribe((res: DepartmentResponse) => {
        this.departmentList = res.data;
      });
  }

  getAllParentsCategory() {
    this.parentCategoryService
      .getAllParentsCategory()
      .subscribe((res: ParentCategoryResponse) => {
        this.parentCategoryList = res.data;
      });
  }

  saveParentCategory() {
    console.log(this.newParentCategory);
    this.parentCategoryService
      .createParentCategory(this.newParentCategory)
      .subscribe((res: ParentCategoryResponse) => {
        if (res.result) {
          alert('Categoría creada con éxito');
          this.getAllParentsCategory();
        } else {
          alert('Error al crear la categoría: ' + res.message);
        }
      });
  }

  onEdit(parentCategory: ParentCategory) {
    this.newParentCategory = parentCategory;
  }

  updateParentCategory() {
    this.parentCategoryService
      .updateParentCategory(this.newParentCategory)
      .subscribe((res: ParentCategoryResponse) => {
        if (res.result) {
          alert('Categoría actualizada con éxito');
          this.getAllParentsCategory();
        } else {
          alert('Error al crear la categoría: ' + res.message);
        }
      });
  }

  onDelete(departmentId: number) {
    const isDelete = confirm('¿Estás seguro de eliminar la categoría?');
    if (!isDelete) return;
    this.parentCategoryService
      .deleteParentCategory(departmentId)
      .subscribe((res: ParentCategoryResponse) => {
        if (res.result) {
          alert('Categoría eliminada con éxito');
          this.getAllParentsCategory();
        } else {
          alert('Error al eliminar la categoría: ' + res.message);
        }
      });
  }
}
