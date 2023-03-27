import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidateEmployeeComponent } from './liquidate-employee.component';

describe('LiquidateEmployeeComponent', () => {
  let component: LiquidateEmployeeComponent;
  let fixture: ComponentFixture<LiquidateEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidateEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
