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
  QUESTIONMARK = 'QUESTIONMARK',
  COLON = 'COLON',
  ELVIS = 'ELVIS',
  IDENTIFIER = 'IDENTIFIER',
}

export class Token {
  constructor(public type: TokenType, public value: number | string = 0) {}
}
