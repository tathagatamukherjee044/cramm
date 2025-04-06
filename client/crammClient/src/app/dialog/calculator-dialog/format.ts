import { isOperator } from '../calculator-dialog/model';

export function format(input: string): string {
  if (isOperator(input)) {
    return input;
  } else {
    return input.replace('.', ',');
  }
}