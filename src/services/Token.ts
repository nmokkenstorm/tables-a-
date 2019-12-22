export enum TokenType {
  EOF = 'EOF',
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  MUL = 'MUL',
  DIV = 'DIV',
  INTEGER = 'INTEGER',
  LPAREN = '(',
  RPAREN = ')',
  NOT_EQUALS = '!=',
  EQUALS = '==',
  GREATER_EQUALS = '>=',
  LESSER_EQUALS = '<=',
  GREATER = '>',
  LESSER = '<',
  NOT = '!',
}

export class Token {
  constructor(public type: TokenType, public value: number = 0) {}
}
