export interface IParentCategory {
  categoryId: number;
  categoryName: string;
  deptId: number;
}

export class ParentCategory implements IParentCategory {
  categoryId: number;
  categoryName: string;
  deptId: number;

  constructor(categoryId?: number, categoryName?: string, deptId?: number) {
    this.categoryId = categoryId ? categoryId : 0;
    this.categoryName = categoryName ? categoryName : '';
    this.deptId = deptId ? deptId : 0;
  }
}
