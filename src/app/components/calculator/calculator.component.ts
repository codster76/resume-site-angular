import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  operation1: Operation = new Operation([new Operation([new Operation(6, OperationType.Add), new Operation(4, OperationType.Subtract)], OperationType.None), new Operation(2,OperationType.Multiply)], OperationType.None);
  operation2: Operation = new Operation(123, OperationType.Divide);
  operation3: Operation = new Operation([new Operation(10, OperationType.Add)], OperationType.Divide);
  operation4: Operation = new Operation(
    [
      new Operation(3, OperationType.Add),
      new Operation(4, OperationType.Multiply),
      new Operation(2, OperationType.None),
    ], OperationType.None
  );
  operation5: Operation = new Operation(
    [
      new Operation([
        new Operation(8, OperationType.Divide),
        new Operation(4, OperationType.Add),
        new Operation([
          new Operation(14, OperationType.Divide),
          new Operation(2, OperationType.Add),
          new Operation(3, OperationType.Subtract),
        ], OperationType.None),
      ], OperationType.None),
      new Operation(4, OperationType.Multiply),
      new Operation(2, OperationType.None),
    ], OperationType.None
  );
  //((8 / 4 + (14 / 2 + 3 -)) 4 * 2) = 4
  operation6: Operation = new Operation(
    [
      new Operation(5, OperationType.Divide),
      new Operation(10, OperationType.None),
    ], OperationType.None
  )

  constructor() { }

  ngOnInit(): void {
  }

  someFunction() {
    console.log(this.calculate(this.operation6));
  }

  calculate(operationToCalculate: Operation) {
    if(operationToCalculate.isNumber) {
      return operationToCalculate;
    }

    const valueAsArray: Operation[] = operationToCalculate.value as Operation[]; // The if statement confirms that it's an operation array. This is just for convenience.

    if(valueAsArray.length === 0) {
      return new Operation(NaN, OperationType.None);
    }

    if(valueAsArray.length === 1) {
      return new Operation(valueAsArray[0].value, valueAsArray[0].operationForNext);
    }

    while(valueAsArray.length > 1) {
      // First pass for multiplication/division
      for(let i = 0; i < valueAsArray.length-1; i++) {
        if(valueAsArray[i].operationForNext === OperationType.Multiply || valueAsArray[i].operationForNext === OperationType.Divide) {
          if(!valueAsArray[i].isNumber) {
            valueAsArray[i] = this.calculate(valueAsArray[i]);
          }
          if(!valueAsArray[i+1].isNumber) {
            valueAsArray[i+1] = this.calculate(valueAsArray[i+1]);
          }
          const operation1 = valueAsArray.splice(i,1)[0];
          const operation2 = valueAsArray.splice(i,1)[0];
    
          const arrayValue1 = operation1?.value as number;
          const arrayValue2 = operation2?.value as number;
    
          let calculatedNumber = 0;
          switch(operation1.operationForNext) {
            case OperationType.Multiply:
              calculatedNumber = arrayValue1 * arrayValue2;
              break;
            case OperationType.Divide:
              calculatedNumber = arrayValue1 / arrayValue2;
              break;
          }
          valueAsArray.splice(i, 0, new Operation(calculatedNumber, operation2.operationForNext));
        }
      }

      // Second pass for addition/subtraction
      for(let i = 0; i < valueAsArray.length-1; i++) {
        if(!valueAsArray[i].isNumber) {
          valueAsArray[i] = this.calculate(valueAsArray[i]);
        }
        if(!valueAsArray[i+1].isNumber) {
          valueAsArray[i+1] = this.calculate(valueAsArray[i+1]);
        }
        const operation1 = valueAsArray.splice(i,1)[0];
        const operation2 = valueAsArray.splice(i,1)[0];
  
        const arrayValue1 = operation1?.value as number;
        const arrayValue2 = operation2?.value as number;
  
        let calculatedNumber = 0;
        switch(operation1.operationForNext) {
          case OperationType.Add:
            calculatedNumber = arrayValue1 + arrayValue2;
            break;
          case OperationType.Subtract:
            calculatedNumber = arrayValue1 - arrayValue2;
            break;
        }
        valueAsArray.splice(i, 0, new Operation(calculatedNumber, operation2.operationForNext));
      }
    }

    return new Operation(valueAsArray[0].value, valueAsArray[0].operationForNext);
  }

}

class Operation {
  value: Operation[] | number = [];
  operationForNext: OperationType;
  isNumber: boolean;

  constructor(values: Operation[] | number, operationType: OperationType) {
    this.value = values;
    this.operationForNext = operationType;
    
    if(typeof values === 'number') {
      this.isNumber = true;
    } else {
      // I have to do this jankiness because you can't define more than one constructor in javascript
      this.operationForNext = OperationType.None;
      this.isNumber = false;
    }
  }
}

enum OperationType {
  Add = "add",
  Subtract = "subtract",
  Multiply = "multiply",
  Divide = "divide",
  None = "none",
}