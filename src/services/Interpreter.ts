import {Token, TokenType} from './Token';
import {Lexer} from './Lexer';

function numerical(value: string | number): number {
  const numerical = Number(value);

  if (Number.isNaN(numerical)) {
    throw new Error('Using string as numerical value');
  }

  return numerical;
}

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

  factor(): number | string {
    let token = this.currentToken;
    if (token.type == TokenType.INTEGER) {
      this.eat(TokenType.INTEGER);
      return token.value;
    } else if (token.type == TokenType.LPAREN) {
      this.eat(TokenType.LPAREN);
      let result = this.run();
      this.eat(TokenType.RPAREN);
      return result;
    } else if (token.type == TokenType.PLUS) {
      this.eat(TokenType.PLUS);
      return this.factor();
    } else if (token.type == TokenType.MINUS) {
      this.eat(TokenType.MINUS);
      return -1 * numerical(this.factor());
    } else if (token.type == TokenType.NOT) {
      this.eat(TokenType.NOT);
      return this.factor() ? 0 : 1;
    } else {
      throw new Error('Unsupported token ' + this.currentToken.type);
    }
  }

  term(): number | string {
    let result = this.factor();

    while ([TokenType.MUL, TokenType.DIV].includes(this.currentToken.type)) {
      result = numerical(result);

      if (this.currentToken.type == TokenType.MUL) {
        this.eat(TokenType.MUL);
        result *= numerical(this.factor());
      } else {
        this.eat(TokenType.DIV);
        result /= numerical(this.factor());
      }
    }

    return result;
  }

  expr(): number | string {
    let result = this.term();

    while ([TokenType.PLUS, TokenType.MINUS].includes(this.currentToken.type)) {
      result = numerical(result);

      if (this.currentToken.type == TokenType.PLUS) {
        this.eat(TokenType.PLUS);
        result += numerical(this.term());
      } else {
        this.eat(TokenType.MINUS);
        result -= numerical(this.term());
      }
    }

    return result;
  }

  operator(): number | string {
    let result = this.expr();

    while (
      [
        TokenType.GREATER_EQUALS,
        TokenType.LESSER_EQUALS,
        TokenType.GREATER,
        TokenType.LESSER,
      ].includes(this.currentToken.type)
    ) {
      result = numerical(result);

      if (this.currentToken.type == TokenType.GREATER_EQUALS) {
        this.eat(TokenType.GREATER_EQUALS);
        result = result >= numerical(this.expr()) ? 1 : 0;
      } else if (this.currentToken.type == TokenType.LESSER_EQUALS) {
        this.eat(TokenType.LESSER_EQUALS);
        result = result <= numerical(this.expr()) ? 1 : 0;
      } else if (this.currentToken.type == TokenType.GREATER) {
        this.eat(TokenType.GREATER);
        result = result > numerical(this.expr()) ? 1 : 0;
      } else if (this.currentToken.type == TokenType.LESSER) {
        this.eat(TokenType.LESSER);
        result = result < numerical(this.expr()) ? 1 : 0;
      }
    }

    return result;
  }

  equality(): number | string {
    let result = this.operator();

    while (
      [TokenType.EQUALS, TokenType.NOT_EQUALS].includes(this.currentToken.type)
    ) {
      if (this.currentToken.type == TokenType.EQUALS) {
        this.eat(TokenType.EQUALS);
        result = result == this.operator() ? 1 : 0;
      } else if (this.currentToken.type == TokenType.NOT_EQUALS) {
        this.eat(TokenType.NOT_EQUALS);
        result = result != this.operator() ? 1 : 0;
      }
    }

    return result;
  }

  ternary(): number | string {
    let result = this.equality();

    while (TokenType.QUESTIONMARK == this.currentToken.type) {
      this.eat(TokenType.QUESTIONMARK);
      let left = this.equality();

      this.eat(TokenType.COLON);
      let right = this.equality();

      result = result ? left : right;
    }

    return result;
  }

  elvis(): number | string {
    let result = this.ternary();

    while (TokenType.ELVIS == this.currentToken.type) {
      this.eat(TokenType.ELVIS);

      result = result != 0 ? result : this.ternary();
    }

    return result;
  }

  run(): number | string {
    return this.elvis();
  }
}
