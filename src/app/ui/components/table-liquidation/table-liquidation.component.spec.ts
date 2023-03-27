import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLiquidationComponent } from './table-liquidation.component';

describe('TableLiquidationComponent', () => {
  let component: TableLiquidationComponent;
  let fixture: ComponentFixture<TableLiquidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLiquidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLiquidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
