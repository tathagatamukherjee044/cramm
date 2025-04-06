import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorDialogComponent } from './calculator-dialog.component';

describe('CalculatorDialogComponent', () => {
  let component: CalculatorDialogComponent;
  let fixture: ComponentFixture<CalculatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
