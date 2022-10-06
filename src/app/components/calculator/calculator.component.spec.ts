import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent, Operation, OperationType } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    const testOperation: Operation = Operation.operationArray(
      [
        Operation.operationArray([
          Operation.singleValue(8, OperationType.Divide),
          Operation.singleValue(4, OperationType.Add),
          Operation.operationArray([
            Operation.singleValue(14, OperationType.Divide),
            Operation.singleValue(2, OperationType.Add),
            Operation.singleValue(3, OperationType.Subtract),
          ]),
        ]),
        Operation.singleValue(4, OperationType.Multiply),
        Operation.singleValue(2, OperationType.None),
      ]);
    expect(component.calculate(testOperation)).toEqual(Operation.singleValue(4, OperationType.None));
  });
});
