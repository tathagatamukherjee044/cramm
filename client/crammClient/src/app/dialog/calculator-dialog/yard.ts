import { isOperator } from './model';

export function yard(infix: string[]): string[] {
  const ops = { '+': 1, '-': 1, '*': 2, '/': 2 };
  const peek = (arr: string[]): string | undefined => arr[arr.length - 1];
  const stack: string[] = [];

  return infix.reduce((output : string[], token) => {
    if (!isOperator(token)) {
      output.push(token);
    } else {
      if (token in ops) {
        while (peek(stack) && token in ops && peek(stack)! in ops && ops[token as keyof typeof ops] <= ops[peek(stack)! as keyof typeof ops]) {
          const popped = stack.pop();
          if (popped !== undefined) {
            output.push(popped);
          }
        }

        stack.push(token);
      }

      if (token === '(') {
        stack.push(token);
      }

      if (token === ')') {
        while (stack.length > 0 && peek(stack) !== '(') {
          const popped = stack.pop();
          if (popped !== undefined) {
            output.push(popped);
          }
        }

        stack.pop();
      }
    }

    return output;
  }, []).concat(stack.reverse());
}
