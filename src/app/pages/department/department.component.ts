import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Department } from '../../interfaces/departments/Department';
import { DepartmentResponse } from '../../interfaces/departments/DepartmentResponse';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent implements OnInit {
  private masterService = inject(MasterService);
  departmentList: Department[] = [];
  newDepartment: Department = new Department();

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.masterService
      .getAllDepartments()
      .subscribe((res: DepartmentResponse) => {
        this.departmentList = res.data;
      });
  }

  saveDepartment() {
    console.log(this.newDepartment);
    this.masterService
      .createDepartment(this.newDepartment)
      .subscribe((res: DepartmentResponse) => {
        if (res.result) {
          alert('Departamento creado con éxito');
          this.getAllDepartments();
        } else {
          alert('Error al crear el departamento: ' + res.message);
        }
      });
  }

  onEdit(department: Department) {
    this.newDepartment = department;
  }

  updateDepartment() {
    this.masterService
      .updateDepartment(this.newDepartment)
      .subscribe((res: DepartmentResponse) => {
        if (res.result) {
          alert('Departamento actualizado con éxito');
          this.getAllDepartments();
        } else {
          alert('Error al crear el departamento: ' + res.message);
        }
      });
  }

  onDelete(departmentId: number) {
    const isDelete = confirm('¿Estás seguro de eliminar el departamento?');
    if (!isDelete) return;
    this.masterService
      .deleteDepartment(departmentId)
      .subscribe((res: DepartmentResponse) => {
        if (res.result) {
          alert('Departamento eliminado con éxito');
          this.getAllDepartments();
        } else {
          alert('Error al eliminar el departamento: ' + res.message);
        }
      });
  }
}
