import { CommonResponse } from '../CommonResponse';
import { ParentCategory } from './ParentCategory';

export interface ParentCategoryResponse extends CommonResponse {
  data: ParentCategory[];
}
