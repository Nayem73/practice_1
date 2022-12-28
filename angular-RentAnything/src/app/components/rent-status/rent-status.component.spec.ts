import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentStatusComponent } from './rent-status.component';

describe('RentStatusComponent', () => {
  let component: RentStatusComponent;
  let fixture: ComponentFixture<RentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
