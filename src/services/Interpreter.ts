import {Token, TokenType} from './Token';
import {Lexer} from './Lexer';

export class Interpreter {
  currentToken: Token;

  constructor(private lexer: Lexer) {
    this.currentToken = this.nextToken();
  }

  eat(tokenType: string): void {
    if (this.currentToken.type != tokenType) {
      throw new Error(
        `Token type mismatch: Expected ${tokenType}, got ${this.currentToken.type}`,
      );
    }

    this.currentToken = this.nextToken();
  }

  nextToken(): Token {
    return this.lexer.getNextToken();
  }

  factor(): number {
    let token = this.currentToken;
    if (token.type == TokenType.INTEGER) {
      this.eat(TokenType.INTEGER);
      return token.value;
    } else if (token.type == TokenType.LPAREN) {
      this.eat(TokenType.LPAREN);
      let result = this.expr();
      this.eat(TokenType.RPAREN);
      return result;
    } else if (token.type == TokenType.PLUS) {
      this.eat(TokenType.PLUS);
      return this.factor();
    } else if (token.type == TokenType.MINUS) {
      this.eat(TokenType.MINUS);
      return -1 * this.factor();
    } else {
      throw new Error('Unsupported token ' + this.currentToken.type);
    }
  }

  term(): number {
    let result = this.factor();

    while ([TokenType.MUL, TokenType.DIV].includes(this.currentToken.type)) {
      if (this.currentToken.type == TokenType.MUL) {
        this.eat(TokenType.MUL);
        result *= this.factor();
      } else {
        this.eat(TokenType.DIV);
        result /= this.factor();
      }
    }

    return result;
  }

  expr(): number {
    let result = this.term();

    while ([TokenType.PLUS, TokenType.MINUS].includes(this.currentToken.type)) {
      if (this.currentToken.type == TokenType.PLUS) {
        this.eat(TokenType.PLUS);
        result += this.term();
      } else {
        this.eat(TokenType.MINUS);
        result -= this.term();
      }
    }

    return result;
  }
}
