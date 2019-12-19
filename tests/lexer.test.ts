import {Lexer} from '../src/services/Lexer';

it('should generate a stream of tokens', () => {
  const expression = '1 + 1';

  const lexer = new Lexer(expression);

  expect(lexer.getNextToken().value).toBe(1);
  expect(lexer.getNextToken().type).toBe('PLUS');
  expect(lexer.getNextToken().value).toBe(1);
});

it('it should handle extra spaces correctly', () => {
  const expression = '     1      -  3      ';

  const lexer = new Lexer(expression);

  expect(lexer.getNextToken().value).toBe(1);
  expect(lexer.getNextToken().type).toBe('MINUS');
  expect(lexer.getNextToken().value).toBe(3);
  expect(lexer.getNextToken().type).toBe('EOF');
});
