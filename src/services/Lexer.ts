import {Token, TokenType} from './Token';

const isIntChar = (c): boolean => c >= '0' && c <= '9';

const doubleCharMap = {
  '!=': TokenType.NOT_EQUALS,
  '==': TokenType.EQUALS,
  '>=': TokenType.GREATER_EQUALS,
  '<=': TokenType.LESSER_EQUALS,
  '?:': TokenType.ELVIS,
};

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
  '?': TokenType.QUESTIONMARK,
  ':': TokenType.COLON,
};

export class Lexer {
  position: number = -1;
  currentToken: Token;
  currentChar: string;
  nextChar: string;

  constructor(private expression: string) {
    this.advance();
  }

  advance(): void {
    this.position++;
    this.currentChar = this.expression.charAt(this.position);
    this.nextChar = this.expression.charAt(this.position + 1);
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

      if (doubleCharMap[this.currentChar + this.nextChar]) {
        const token = new Token(
          doubleCharMap[this.currentChar + this.nextChar],
        );
        this.advance();
        this.advance();
        return token;
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
