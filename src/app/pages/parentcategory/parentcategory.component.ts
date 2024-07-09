import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Department } from '../../interfaces/departments/Department';
import { DepartmentResponse } from '../../interfaces/departments/DepartmentResponse';
import { ParentCategory } from '../../interfaces/parent-category/ParentCategory';
import { ParentCategoryResponse } from '../../interfaces/parent-category/ParentCategoryResponse';
import { DepartmentService } from '../../services/department.service';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-parentcategory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './parentcategory.component.html',
  styleUrl: './parentcategory.component.css',
})
export class ParentcategoryComponent {
  private masterService = inject(MasterService);
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
    this.masterService
      .getAllParentsCategory()
      .subscribe((res: ParentCategoryResponse) => {
        this.parentCategoryList = res.data;
      });
  }

  saveParentCategory() {
    console.log(this.newParentCategory);
    this.masterService
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
    this.masterService
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
    this.masterService
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
