import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ChildCategory } from '../../core/interfaces/child-category/ChildCategory';
import { ParentCategoryService } from '../parentcategory/shared/services/parent-category.service';
import { ChildcategoryComponent } from './childcategory.component';
import { ChildCategoryService } from './shared/services/child-category.service';

describe('ChildcategoryComponent', () => {
  let component: ChildcategoryComponent;
  let fixture: ComponentFixture<ChildcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildcategoryComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        ChildCategoryService,
        ParentCategoryService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('newChildCategory debe iniciarse como un objeto ChildCategory', () => {
    expect(component.newChildCategory instanceof ChildCategory).toBeTrue();

    const expectedChildCategory: ChildCategory = new ChildCategory(
      0,
      '',
      '',
      0
    );

    expect(component.newChildCategory).toEqual(expectedChildCategory);
  });
});
