export enum TokenType {
  EOF = 'EOF',
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  INTEGER = 'INTEGER',
}

export class Token {
  constructor(public type: TokenType, public value: number = 0) {}
}
