export interface IChildCategory {
  childCategoryId: number;
  categoryName: string;
  parentCategoryName: string;
  parentCategoryId: number;
}

export class ChildCategory implements IChildCategory {
  childCategoryId: number;
  categoryName: string;
  parentCategoryName: string;
  parentCategoryId: number;

  constructor(
    childCategoryId?: number,
    categoryName?: string,
    parentCategoryName?: string,
    parentCategoryId?: number
  ) {
    this.childCategoryId = childCategoryId ? childCategoryId : 0;
    this.categoryName = categoryName ? categoryName : '';
    this.parentCategoryName = parentCategoryName ? parentCategoryName : '';
    this.parentCategoryId = parentCategoryId ? parentCategoryId : 0;
  }
}
