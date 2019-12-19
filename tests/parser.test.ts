import {parse} from '../src/services/Parser';

it('should evaluate expressions with addition correctly', () => {
  const expression = '= 3 + 5';

  expect(parse(expression)).toBe(8);
});

it('should evaluate expressions with division and multiplication correctly', () => {
  expect(parse('=1/2/4')).toBe(0.125);
  expect(parse('=1/2/2')).toBe(0.25);
});

it('should evaluate expressions with parantheses correctly', () => {
  expect(parse('=(2)')).toBe(2);
  expect(parse('=(2+4)/3')).toBe(2);
});
