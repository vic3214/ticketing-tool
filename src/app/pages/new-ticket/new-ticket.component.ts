import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { catchError, forkJoin, Observable, of, retry } from 'rxjs';
import { ChildCategory } from '../../core/interfaces/child-category/ChildCategory';
import { ChildCategoryResponse } from '../../core/interfaces/child-category/ChildCategoryResponse';
import { Department } from '../../core/interfaces/department/Department';
import { DepartmentResponse } from '../../core/interfaces/department/DepartmentResponse';
import { Employee } from '../../core/interfaces/employee/Employee';
import { ParentCategory } from '../../core/interfaces/parent-category/ParentCategory';
import { ParentCategoryResponse } from '../../core/interfaces/parent-category/ParentCategoryResponse';
import { Ticket } from '../../core/interfaces/ticket/Ticket';
import { ChildCategoryService } from '../../core/services/child-category.service';
import { DepartmentService } from '../../core/services/department.service';
import { ParentCategoryService } from '../../core/services/parent-category.service';
import { TicketService } from '../../core/services/ticket.service';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit {
  private departmentService = inject(DepartmentService);
  private parentCategoryService = inject(ParentCategoryService);
  private childCategoryService = inject(ChildCategoryService);
  private ticketService = inject(TicketService);
  private cookieService = inject(CookieService);

  departmentList: Department[] = [];
  parentCategoryList: ParentCategory[] = [];
  childCategoryList: ChildCategory[] = [];
  filterChildCategoryList: ChildCategory[] = [];
  selectedParentCategoryName: string = '';

  newTicket = new Ticket();

  ngOnInit(): void {
    this.assignLoggedUserToTicket();

    forkJoin({
      departments: this.departmentService
        .getAllDepartments()
        .pipe(
          retry(1),
          catchError(
            this.handleError<DepartmentResponse>('obtención de departamentos')
          )
        ),
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
    }).subscribe(({ departments, parentCategorys, childCategorys }) => {
      this.departmentList = departments.data;
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

  onCategoryChange() {
    console.log(this.selectedParentCategoryName);
    console.log(this.childCategoryList);
    this.filterChildCategoryList = this.childCategoryList.filter(
      (child) => child.parentCategoryName === this.selectedParentCategoryName
    );
  }

  onCreateTicket() {
    this.ticketService.createTicket(this.newTicket).subscribe((res) => {
      if (res.result) {
        alert('Ticket creado correctamente.');
      } else {
        alert(res.message);
      }
    });
  }

  assignLoggedUserToTicket() {
    const loggedUserData = this.cookieService.get('ticketUser');
    if (loggedUserData !== null) {
      const userData: Employee = JSON.parse(loggedUserData);
      this.newTicket.employeeId = userData.employeeId;
    }
  }
}
