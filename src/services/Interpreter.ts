import {Token, TokenType} from './Token';
import {Lexer} from './Lexer';

export class Interpreter {
  currentToken: Token;

  constructor(private lexer: Lexer) {}

  eat(tokenType: string): void {
    if (this.currentToken.type != tokenType) {
      throw new Error('token type mismatch');
    }

    this.currentToken = this.nextToken();
  }

  nextToken(): Token {
    return this.lexer.getNextToken();
  }

  term(): number {
    let token = this.currentToken;
    this.eat(TokenType.INTEGER);
    return token.value;
  }

  expr(): number {
    this.currentToken = this.nextToken();
    let result = this.term();

    while (this.currentToken.type != 'EOF') {
      if (this.currentToken.type == TokenType.PLUS) {
        this.eat(TokenType.PLUS);
        result += this.term();
      } else if (this.currentToken.type == TokenType.MINUS) {
        this.eat(TokenType.MINUS);
        result += this.term();
      } else {
        throw new Error('unsupported expression');
      }
    }

    return result;
  }
}
