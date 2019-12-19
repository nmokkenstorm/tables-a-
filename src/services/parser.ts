import {Lexer} from './Lexer';
import {Interpreter} from './Interpreter';

export const parse = (cellvalue: string): string | number => {
  if (cellvalue.charAt(0) != '=') {
    return cellvalue;
  }

  return new Interpreter(new Lexer(cellvalue.substr(1))).expr();
};
