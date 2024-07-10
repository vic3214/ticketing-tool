export interface IChildCategory {
  childCategoryId: number;
  categoryName: string;
  parentCategoryName: string;
  parentCategoryId?: number;
}

export class ChildCategory implements IChildCategory {
  childCategoryId: number;
  categoryName: string;
  parentCategoryName: string;
  parentCategoryId?: number;

  constructor(
    childCategoryId?: number,
    categoryName?: string,
    parentCategoryName?: string,
    parentCategoryId?: number
  ) {
    this.childCategoryId = childCategoryId ?? 0;
    this.categoryName = categoryName ?? '';
    this.parentCategoryName = parentCategoryName ?? '';
    this.parentCategoryId = parentCategoryId ?? 0;
  }
}
