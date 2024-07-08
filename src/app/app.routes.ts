import { Routes } from '@angular/router';
import { ChildcategoryComponent } from './pages/childcategory/childcategory.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DepartmentComponent } from './pages/department/department.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ParentcategoryComponent } from './pages/parentcategory/parentcategory.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'department',
        component: DepartmentComponent,
      },
      {
        path: 'parent-category',
        component: ParentcategoryComponent,
      },
      {
        path: 'child-category',
        component: ChildcategoryComponent,
      },
    ],
  },
];
