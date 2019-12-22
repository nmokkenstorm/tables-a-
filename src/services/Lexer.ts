import {Token, TokenType} from './Token';

const isIntChar = (c): boolean => c >= '0' && c <= '9';

const singleCharMap = {
  '+': TokenType.PLUS,
  '-': TokenType.MINUS,
  '/': TokenType.DIV,
  '*': TokenType.MUL,
  '(': TokenType.LPAREN,
  ')': TokenType.RPAREN,
  '>': TokenType.GREATER,
  '<': TokenType.LESSER,
  '!': TokenType.NOT,
};

export class Lexer {
  position: number = 0;
  currentToken: Token;
  currentChar: string;

  constructor(private expression: string) {
    this.currentChar = expression.charAt(this.position);
  }

  advance(): void {
    this.position++;
    this.currentChar = this.expression.charAt(this.position);
  }

  readInteger(): number {
    let result: string = '';

    while (isIntChar(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }

    return parseInt(result);
  }

  skipWhiteSpace(): void {
    while (this.currentChar != '' && this.currentChar == ' ') {
      this.advance();
    }
  }

  getNextToken(): Token {
    while (this.currentChar != '') {
      if (isIntChar(this.currentChar)) {
        return new Token(TokenType.INTEGER, this.readInteger());
      }
      if (this.currentChar == ' ') {
        this.skipWhiteSpace();
        continue;
      }

      if (singleCharMap[this.currentChar]) {
        const token = new Token(singleCharMap[this.currentChar]);
        this.advance();
        return token;
      }

      throw new Error(`Unsupported character ${this.currentChar} encountered`);
    }

    return new Token(TokenType.EOF, null);
  }
}
