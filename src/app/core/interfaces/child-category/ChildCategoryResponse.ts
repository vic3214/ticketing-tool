import { CommonResponse } from '../CommonResponse';
import { ChildCategory } from './ChildCategory';

export interface ChildCategoryResponse extends CommonResponse {
  data: ChildCategory[];
}
