import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, Observable, of, retry } from 'rxjs';
import { Department } from '../../core/interfaces/department/Department';
import { DepartmentResponse } from '../../core/interfaces/department/DepartmentResponse';
import { Employee } from '../../core/interfaces/employee/Employee';
import { EmployeeResponse } from '../../core/interfaces/employee/EmployeeResponse';
import { Role } from '../../core/interfaces/role/Role';
import { DepartmentService } from '../../core/services/department.service';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  newEmployee: Employee = new Employee();
  departmentList: Department[] = [];
  employeesList: Employee[] = [];
  roleList: Role[] = [];
  isNewView: boolean = false;

  ngOnInit(): void {
    forkJoin({
      roles: this.employeeService
        .getAllRoles()
        .pipe(
          retry(1),
          catchError(this.handleError<Role[]>('obtención de roles'))
        ),
      employees: this.employeeService
        .getAllEmployees()
        .pipe(
          retry(1),
          catchError(
            this.handleError<EmployeeResponse>('obtención de empleados')
          )
        ),
      departments: this.departmentService
        .getAllDepartments()
        .pipe(
          retry(1),
          catchError(
            this.handleError<DepartmentResponse>('obtención de departamentos')
          )
        ),
    }).subscribe(({ roles, employees, departments }) => {
      this.roleList = roles ?? [];
      this.employeesList = employees.data;
      this.departmentList = departments.data;
    });
  }

  handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      alert(`Falló la ${operation}: ${error.message}. Recarga la página.`);
      return of(result as T);
    };
  }

  getAllEmployees() {
    this.employeeService
      .getAllEmployees()
      .subscribe((res: EmployeeResponse) => {
        this.employeesList = res.data;
      });
  }

  saveEmployee() {
    this.employeeService
      .createEmployee(this.newEmployee)
      .subscribe((res: EmployeeResponse) => {
        if (res.result) {
          alert('Empleado creado con éxito');
          this.getAllEmployees();
          this.isNewView = false;
        } else {
          alert('Error al crear el empleado: ' + res.message);
        }
      });
  }

  onEdit(employee: Employee) {
    this.newEmployee = employee;
  }

  updateEmployee() {
    this.employeeService
      .updateEmployee(this.newEmployee)
      .subscribe((res: EmployeeResponse) => {
        if (res.result) {
          alert('Emploeado actualizado con éxito');
          this.getAllEmployees();
        } else {
          alert('Error al actualizar el empleado: ' + res.message);
        }
      });
  }

  onDelete(employeeId: number) {
    const isDelete = confirm('¿Estás seguro de eliminar el empleado?');
    if (!isDelete) return;
    this.employeeService
      .deleteEmployee(employeeId)
      .subscribe((res: EmployeeResponse) => {
        if (res.result) {
          alert('Empleado eliminado con éxito');
          this.getAllEmployees();
        } else {
          alert('Error al eliminar el empleado: ' + res.message);
        }
      });
  }
}
