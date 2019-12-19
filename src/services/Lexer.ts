import {Token, TokenType} from './Token';

const isIntChar = (c): boolean => c >= '0' && c <= '9';

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
      if (this.currentChar == '+') {
        this.advance();
        return new Token(TokenType.PLUS);
      }
      if (this.currentChar == '-') {
        this.advance();
        return new Token(TokenType.MINUS);
      }
      if (this.currentChar == '*') {
        this.advance();
        return new Token(TokenType.MUL);
      }
      if (this.currentChar == '/') {
        this.advance();
        return new Token(TokenType.DIV);
      }
      if (this.currentChar == '(') {
        this.advance();
        return new Token(TokenType.LPAREN);
      }
      if (this.currentChar == ')') {
        this.advance();
        return new Token(TokenType.RPAREN);
      }

      throw new Error(`Unsupported character ${this.currentChar} encountered`);
    }

    return new Token(TokenType.EOF, null);
  }
}
