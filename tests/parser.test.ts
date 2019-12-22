import {parse} from '../src/services/Parser';

it('should evaluate expressions with addition correctly', () => {
  expect(parse('= 3 + 5')).toBe(8);
  expect(parse('= 3 - 5')).toBe(-2);
});

it('should evaluate expressions with division and multiplication correctly', () => {
  expect(parse('=1/2/4')).toBe(0.125);
  expect(parse('=1/2/2')).toBe(0.25);
});

it('should evaluate expressions with parantheses correctly', () => {
  expect(parse('=(2)')).toBe(2);
  expect(parse('=(2+4)/3')).toBe(2);
});

it('should evaluate expressions with negative numbers correctly', () => {
  expect(parse('=-2')).toBe(-2);
  expect(parse('=10 * -3')).toBe(-30);
});

it('should negate expressions correctly', () => {
  expect(parse('=!-1')).toBe(0);
  expect(parse('=!0')).toBe(1);
  expect(parse('=!1')).toBe(0);
  expect(parse('=!2')).toBe(0);
});

it('should compare expressions correctly', () => {
  expect(parse('= 1 > -1')).toBe(1);
  expect(parse('= 1 > 0')).toBe(1);
  expect(parse('= 1 > 1')).toBe(0);
  expect(parse('= 1 > 2')).toBe(0);

  expect(parse('= 1 < -1')).toBe(0);
  expect(parse('= 1 < 0')).toBe(0);
  expect(parse('= 1 < 1')).toBe(0);
  expect(parse('= 1 < 2')).toBe(1);

  expect(parse('= 1 >= -1')).toBe(1);
  expect(parse('= 1 >= 0')).toBe(1);
  expect(parse('= 1 >= 1')).toBe(1);
  expect(parse('= 1 >= 2')).toBe(0);

  expect(parse('= 1 <= -1')).toBe(0);
  expect(parse('= 1 <= 0')).toBe(0);
  expect(parse('= 1 <= 1')).toBe(1);
  expect(parse('= 1 <= 2')).toBe(1);

  expect(parse('= 1 != -1')).toBe(1);
  expect(parse('= 1 != 0')).toBe(1);
  expect(parse('= 1 != 1')).toBe(0);
  expect(parse('= 1 != 2')).toBe(1);

  expect(parse('= 1 == -1')).toBe(0);
  expect(parse('= 1 == 0')).toBe(0);
  expect(parse('= 1 == 1')).toBe(1);
  expect(parse('= 1 == 2')).toBe(0);
});
