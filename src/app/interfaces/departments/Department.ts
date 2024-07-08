export interface IDepartment {
  deptId: number;
  deptName: string;
  createdDate: Date;
}

export class Department implements IDepartment {
  deptId: number;
  deptName: string;
  createdDate: Date;

  constructor(deptId?: number, deptName?: string) {
    this.deptId = deptId ? deptId : 0;
    this.deptName = deptName ? deptName : '';
    this.createdDate = new Date();
  }

  setDepartmentName(newName: string): void {
    this.deptName = newName;
  }
}
