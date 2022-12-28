import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCategoryMenuComponent } from './vehicle-category-menu.component';

describe('VehicleCategoryMenuComponent', () => {
  let component: VehicleCategoryMenuComponent;
  let fixture: ComponentFixture<VehicleCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleCategoryMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
