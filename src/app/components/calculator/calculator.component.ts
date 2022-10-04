import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  operation1: Operation = Operation.operationArray([Operation.operationArray([
    Operation.singleValue(6, OperationType.Add),
    Operation.singleValue(4, OperationType.Subtract)
  ]), Operation.singleValue(2,OperationType.Multiply)]);

  operation2: Operation = Operation.singleValue(123, OperationType.Divide);

  operation3: Operation = Operation.operationArray([
    Operation.singleValue(10, OperationType.Add)
  ]);

  operation4: Operation = Operation.operationArray(
    [
      Operation.singleValue(3, OperationType.Add),
      Operation.singleValue(4, OperationType.Multiply),
      Operation.singleValue(2, OperationType.None),
    ]);

  operation5: Operation = Operation.operationArray(
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
  // //((8 / 4 + (14 / 2 + 3 -)) 4 * 2) = 4

  operation6: Operation = Operation.operationArray([
      Operation.singleValue(5, OperationType.Divide),
      Operation.singleValue(10, OperationType.None),
    ])

  constructor() { }

  ngOnInit(): void {
  }

  someFunction() {
    console.log(this.calculate(this.operation5));
  }

  calculate(operationToCalculate: Operation) {
    if(operationToCalculate.isNumber) {
      return operationToCalculate;
    }

    const valueAsArray: Operation[] = operationToCalculate.value as Operation[]; // The if statement confirms that it's an operation array. This is just for convenience.

    if(valueAsArray.length === 0) {
      return Operation.singleValue(NaN, OperationType.None);
    }

    if(valueAsArray.length === 1) {
      return Operation.singleValue(valueAsArray[0].value as number, valueAsArray[0].operationSymbol);
    }

    while(valueAsArray.length > 1) {
      // First pass for multiplication/division
      for(let i = 0; i < valueAsArray.length-1; i++) {
        if(valueAsArray[i].operationSymbol === OperationType.Multiply || valueAsArray[i].operationSymbol === OperationType.Divide) {
          // Basically, look at two adjacent values and check whether they are single values or brackets. If they are in brackets, compute whatever's in the brackets first. Ensures that the deepest levels of brackets always get calculated first.
          if(!valueAsArray[i].isNumber) {
            valueAsArray[i] = this.calculate(valueAsArray[i]);
          }
          if(!valueAsArray[i+1].isNumber) {
            valueAsArray[i+1] = this.calculate(valueAsArray[i+1]);
          }

          // Pull the two values you're calculating out of the array and compute them
          const operation1 = valueAsArray.splice(i,1)[0];
          const operation2 = valueAsArray.splice(i,1)[0];
    
          const arrayValue1 = operation1?.value as number;
          const arrayValue2 = operation2?.value as number;
    
          let calculatedNumber = 0;
          switch(operation1.operationSymbol) {
            case OperationType.Multiply:
              calculatedNumber = arrayValue1 * arrayValue2;
              break;
            case OperationType.Divide:
              calculatedNumber = arrayValue1 / arrayValue2;
              break;
          }

          // Once the values have been computed, put them back in the spot they were taken from
          valueAsArray.splice(i, 0, Operation.singleValue(calculatedNumber, operation2.operationSymbol));
        }
      }

      // Second pass for addition/subtraction. Basically the same as before, but without the multiplication/division check.
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
        switch(operation1.operationSymbol) {
          case OperationType.Add:
            calculatedNumber = arrayValue1 + arrayValue2;
            break;
          case OperationType.Subtract:
            calculatedNumber = arrayValue1 - arrayValue2;
            break;
        }
        valueAsArray.splice(i, 0, Operation.singleValue(calculatedNumber, operation2.operationSymbol));
      }
    }

    return Operation.singleValue(valueAsArray[0].value as number, valueAsArray[0].operationSymbol);
  }
}

class Operation {
  value: Operation[] | number = [];
  operationSymbol: OperationType = OperationType.None;
  isNumber: boolean = false;

  static singleValue(value: number, operationType: OperationType): Operation {
    const operation = new Operation();
    operation.value = value;
    operation.operationSymbol = operationType;
    operation.isNumber = true;
    return operation;
  }

  static operationArray(values: Operation[]): Operation {
    const operation = new Operation();
    operation.value = values;
    return operation;
  }
}

enum OperationType {
  Add,
  Subtract,
  Multiply,
  Divide,
  None,
}