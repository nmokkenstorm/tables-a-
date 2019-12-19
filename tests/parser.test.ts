import {parse} from '../src/services/Parser';

it('should evaluate expressions correctly', () => {
  const expression = '= 3 + 5';

  expect(parse(expression)).toBe(8);
});
