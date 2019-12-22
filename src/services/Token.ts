export enum TokenType {
  EOF = 'EOF',
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  MUL = 'MUL',
  DIV = 'DIV',
  INTEGER = 'INTEGER',
  LPAREN = 'LPAREN',
  RPAREN = 'RPAREN',
  NOT_EQUALS = 'NOT_EQUALS',
  EQUALS = 'EQUALS',
  GREATER_EQUALS = 'GREATER_EQUALS',
  LESSER_EQUALS = 'LESSER_EQUALS',
  GREATER = 'GREATER',
  LESSER = 'LESSER',
  NOT = 'NOT',
}

export class Token {
  constructor(public type: TokenType, public value: number = 0) {}
}
