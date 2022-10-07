import { Component, OnInit } from '@angular/core';

// Recursion hell

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  currentOperation: Operation = Operation.createTop();
  currentValue: string = '';
  valueToDisplay: string = '0';

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

  operation5: Operation = Operation.testingConstructor(
    [
      Operation.testingConstructor([
        Operation.singleValue(8, OperationType.Divide),
        Operation.singleValue(4, OperationType.Add),
        Operation.testingConstructor([
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
    ]);

  operation7: Operation = Operation.operationArray([
    Operation.singleValue(5, OperationType.Divide),
    Operation.operationArray([
      Operation.singleValue(3, OperationType.Subtract),
      Operation.singleValue(1, OperationType.Multiply),
    ]),
  ]);

  operation8: Operation = Operation.testingConstructor(
    [
      Operation.singleValue(4, OperationType.Multiply),
      Operation.testingConstructor([
        Operation.testingConstructor([
          Operation.singleValue(3, OperationType.Subtract),
          Operation.singleValue(2, OperationType.Divide),
        ]),
        Operation.testingConstructor([
          Operation.testingConstructor([
            Operation.singleValue(1, OperationType.Add),
            Operation.singleValue(3, OperationType.Multiply),
          ]),
          Operation.testingConstructor([
            Operation.singleValue(4, OperationType.Subtract),
            Operation.singleValue(2, OperationType.Subtract),
          ]),
          Operation.singleValue(2, OperationType.Add),
        ]),
        Operation.testingConstructor([
          Operation.singleValue(2, OperationType.Multiply),
          Operation.testingConstructor([
            Operation.singleValue(4, OperationType.Subtract),
            Operation.singleValue(3, OperationType.Add),
          ]),
          Operation.singleValue(1, OperationType.None),
        ]),
      ]),
    ]);

    operation9: Operation = Operation.operationArray([
      Operation.singleValue(1, OperationType.Add),
      Operation.operationArray([
        Operation.singleValue(99, OperationType.Divide),
        Operation.singleValue(3, OperationType.Multiply),
      ]),
      Operation.singleValue(6, OperationType.None),
    ]);

  constructor() { }

  ngOnInit(): void {
  }

  someFunction() {
    console.log(this.calculate(this.operation9));
    // console.log(this.operation4);
    // const testVariable = (this.operation4.value as Operation[]);
    // testVariable.push(Operation.singleValue(123412423, OperationType.Divide));
    // console.log(this.operation4);
    // console.log(this.operationToString(this.operation4));
    // console.log(this.operationToString(this.operation8));
    // console.time();
    // console.log(this.calculate(this.operation8));
    // console.timeEnd();
  }

  performCalculation() {
    if(this.currentValue !== "") {
      this.insertAtDeepestLevel(this.currentOperation, Operation.singleValue(parseInt(this.currentValue), OperationType.Multiply));
      this.currentValue = "";
    }
    this.valueToDisplay = this.operationToString(this.calculate(this.currentOperation));
  }

  buttonPressed(thingToAdd: string) {
    this.addToOperation(thingToAdd);
    this.valueToDisplay = `${this.operationToString(this.currentOperation)}${this.currentValue}`;
  }

  clear() {
    this.currentOperation = Operation.createTop();
    this.currentValue = "";
    this.valueToDisplay = "0"
  }

  operationToString(operationToConvert: Operation) {
    let stringToReturn = "";

    if(operationToConvert.isNumber) {
      stringToReturn = operationToConvert.value.toString();
      return stringToReturn;
    }

    const operationToConvertAsArray: Operation[] = operationToConvert.value as Operation[];

    for(let i = 0; i < operationToConvertAsArray.length; i++) {
      // if(operationToConvertAsArray[i].hidden) {
      //   stringToReturn = stringToReturn.substring(0,stringToReturn.length);

      //   switch(operationToConvertAsArray[i].operationSymbol) {
      //     case OperationType.Add:
      //       stringToReturn += '+';
      //       break;
      //     case OperationType.Subtract:
      //       stringToReturn += '-';
      //       break;
      //     case OperationType.Multiply:
      //       stringToReturn += '*';
      //       break;
      //     case OperationType.Divide:
      //       stringToReturn += '/';
      //       break;
      //   }
      // } else {
        if(operationToConvertAsArray[i].isNumber) {
          stringToReturn += operationToConvertAsArray[i].value;

          // If it is the last item, add a closing bracket before the symbol
          if(i === operationToConvertAsArray.length-1 && operationToConvert.bracketClosed && !operationToConvert.isTop) {
            stringToReturn += ')';
          }

          switch(operationToConvertAsArray[i].operationSymbol) {
            case OperationType.Add:
              stringToReturn += '+';
              break;
            case OperationType.Subtract:
              stringToReturn += '-';
              break;
            case OperationType.Multiply:
              stringToReturn += '*';
              break;
            case OperationType.Divide:
              stringToReturn += '/';
              break;
          }
        } else {
          stringToReturn += '(';
          stringToReturn += this.operationToString(operationToConvertAsArray[i]);
        }
      // }
    }
    return stringToReturn;
  }

  addToOperation(thingToAdd: string) {
    if(thingToAdd.charCodeAt(0) >= 48 && thingToAdd.charCodeAt(0) <= 57) {
      this.currentValue += thingToAdd;
    } else if (thingToAdd === '+' || thingToAdd === '-' || thingToAdd === '*' || thingToAdd === '/') {
      let symbolToAdd: OperationType;
        switch(thingToAdd) {
          case '+':
            symbolToAdd = OperationType.Add;
            break;
          case '-':
            symbolToAdd = OperationType.Subtract;
            break;
          case '*':
            symbolToAdd = OperationType.Multiply;
            break;
          case '/':
            symbolToAdd = OperationType.Divide;
            break;
        }
        const operationToInsert = Operation.singleValue(parseInt(this.currentValue), symbolToAdd);
      if(this.currentValue !== "") {
        this.insertAtDeepestLevel(this.currentOperation, operationToInsert);
        this.currentValue = "";
      } else {
        this.changeSymbolOfLastNumber(this.currentOperation, symbolToAdd);
      }
    } else if (thingToAdd === '(') {
      // If you've started inputting a number, but haven't given it a symbol, automatically add it and give it a multiplication symbol
      if(this.currentValue !== "") {
        this.insertAtDeepestLevel(this.currentOperation, Operation.singleValue(parseInt(this.currentValue), OperationType.Multiply));
        this.currentValue = "";
      }
      this.insertAtDeepestLevel(this.currentOperation, Operation.operationArray([]))
    } else if (thingToAdd == ')') {
      // If you've started inputting a number, but haven't given it a symbol, automatically add it and give it a multiplication symbol
      if(this.currentValue !== "") {
        this.insertAtDeepestLevel(this.currentOperation, Operation.singleValue(parseInt(this.currentValue), OperationType.Multiply));
        this.currentValue = "";
      }
      this.closeBracket(this.currentOperation);
      if(!this.allBracketsClosed(this.currentOperation)) {
        const lastSymbol: OperationType = this.changeSymbolOfLastNumber(this.currentOperation, OperationType.Multiply);
        this.insertAtDeepestLevel(this.currentOperation, Operation.hidden1(OperationType.Multiply));
      }
    }
  }

  allBracketsClosed(operationToCheck: Operation) {
    const operationToCheckAsArray: Operation[] = operationToCheck.value as Operation[];
    for(const value of operationToCheckAsArray) {
      if(!value.isNumber) {
        if(!value.bracketClosed) {
          return false;
        }
        this.allBracketsClosed(value);
      }
    }
    return true;
  }

  getLatestValue(operationToCheck: Operation) {
    const operationToCheckAsArray: Operation[] = operationToCheck.value as Operation[];
    if(operationToCheckAsArray[operationToCheckAsArray.length].isNumber) {
      return operationToCheckAsArray[operationToCheckAsArray.length];
    } else {
      this.getLatestValue(operationToCheckAsArray[operationToCheckAsArray.length]);
    }
    console.error("No value at the end of the operations");
    return Operation.operationArray([]);
  }

  insertAtDeepestLevel(operationToInsertInto: Operation, operationToInsert: Operation) {
    const operationToInsertIntoAsArray: Operation[] = operationToInsertInto.value as Operation[];
    // If the the value in the array is not a number
    if(!operationToInsertIntoAsArray.at(-1)?.isNumber) {
      if(operationToInsertIntoAsArray.length === 0) {
        // If the array is empty, add the operation immediately
        operationToInsertIntoAsArray.push(operationToInsert);
        return;
      } else if(operationToInsertIntoAsArray[operationToInsertIntoAsArray.length-1].bracketClosed) {
        // If the array is not empty and the last element is a closed bracket, add the operation immediately
        operationToInsertIntoAsArray.push(operationToInsert);
        return;
      } else {
        // If the last value is a bracket, go into that bracket
        // .at won't work here for some reason, so I have to type it all out
        this.insertAtDeepestLevel(operationToInsertIntoAsArray[operationToInsertIntoAsArray.length-1], operationToInsert);
      }
    } else {
      // Once you're in the deepest possible level, insert the operation
      operationToInsertIntoAsArray.push(operationToInsert);
    }
  }

  // Returns the previous symbol
  changeSymbolOfLastNumber(operationToModify: Operation, operationSymbolToModifyTo: OperationType) {
    const operationToModifyArray: Operation[] = operationToModify.value as Operation[];
    if(!operationToModifyArray[operationToModifyArray.length-1].isNumber) {
      this.changeSymbolOfLastNumber(operationToModifyArray[operationToModifyArray.length-1], operationSymbolToModifyTo);
    } else {
      const operationToReturn: OperationType = operationToModifyArray[operationToModifyArray.length-1].operationSymbol;
      operationToModifyArray[operationToModifyArray.length-1].operationSymbol = operationSymbolToModifyTo;
      return operationToReturn;
    }
    return OperationType.None;
  }

  closeBracket(operationToTraverse: Operation) {
    const operationToTraverseAsArray: Operation[] = operationToTraverse.value as Operation[];
    if(!operationToTraverseAsArray[operationToTraverseAsArray.length-1].isNumber) {
      this.closeBracket(operationToTraverseAsArray[operationToTraverseAsArray.length-1]);
    } else {
      operationToTraverse.bracketClosed = true;
    }
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
        // Basically, look at two adjacent values and check whether they are single values or brackets. If they are in brackets, compute whatever's in the brackets first. Ensures that the deepest levels of brackets always get calculated first.
        if(!valueAsArray[i].isNumber) {
          valueAsArray[i] = this.calculate(valueAsArray[i]);
        }
        if(!valueAsArray[i+1].isNumber) {
          valueAsArray[i+1] = this.calculate(valueAsArray[i+1]);
        }

        if(valueAsArray[i].operationSymbol === OperationType.Multiply || valueAsArray[i].operationSymbol === OperationType.Divide) {
        // if(valueAsArray[i].operationSymbol === OperationType.Divide) {

          // Pull the two values you're calculating out of the array and compute them
          const operation1 = valueAsArray.splice(i,1)[0];
          const operation2 = valueAsArray.splice(i,1)[0];
    
          const arrayValue1 = operation1?.value as number;
          const arrayValue2 = operation2?.value as number;

          // console.log(`${arrayValue1} | ${arrayValue2}`);
    
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

      // for(let i = 0; i < valueAsArray.length-1; i++) {
      //   if(valueAsArray[i].operationSymbol === OperationType.Multiply) {
      //     // Basically, look at two adjacent values and check whether they are single values or brackets. If they are in brackets, compute whatever's in the brackets first. Ensures that the deepest levels of brackets always get calculated first.
      //     if(!valueAsArray[i].isNumber) {
      //       valueAsArray[i] = this.calculate(valueAsArray[i]);
      //     }
      //     if(!valueAsArray[i+1].isNumber) {
      //       valueAsArray[i+1] = this.calculate(valueAsArray[i+1]);
      //     }

      //     // Pull the two values you're calculating out of the array and compute them
      //     const operation1 = valueAsArray.splice(i,1)[0];
      //     const operation2 = valueAsArray.splice(i,1)[0];
    
      //     const arrayValue1 = operation1?.value as number;
      //     const arrayValue2 = operation2?.value as number;

      //     // console.log(`${arrayValue1} | ${arrayValue2}`);
    
      //     let calculatedNumber = 0;
      //     calculatedNumber = arrayValue1 * arrayValue2;

      //     // Once the values have been computed, put them back in the spot they were taken from
      //     valueAsArray.splice(i, 0, Operation.singleValue(calculatedNumber, operation2.operationSymbol));
      //   }
      // }

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

export class Operation {
  value: Operation[] | number = [];
  operationSymbol: OperationType = OperationType.None;
  isNumber: boolean = false;
  bracketClosed: boolean = false;
  isTop: boolean = false;
  hidden: boolean = false; // For invisible *1s

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

  static createTop() {
    const operation = new Operation();
    operation.isTop = true;
    return operation;
  }

  static hidden1(symbol: OperationType) {
    const operation = new Operation();
    operation.value = 1;
    operation.operationSymbol = symbol;
    operation.isNumber = true;
    operation.hidden = true;
    return operation;
  }

  static testingConstructor(values: Operation[]): Operation {
    const operation = new Operation();
    operation.value = values;
    operation.bracketClosed = true;
    return operation;
  } 
}

export enum OperationType {
  Add,
  Subtract,
  Multiply,
  Divide,
  None,
}