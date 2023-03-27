import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationInformationComponent } from './liquidation-information.component';

describe('LiquidationInformationComponent', () => {
  let component: LiquidationInformationComponent;
  let fixture: ComponentFixture<LiquidationInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidationInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
