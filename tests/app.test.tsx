import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme';
import {act, Simulate} from 'react-dom/test-utils';
import {App, getKey} from '../src/components/App';

let app;

beforeEach(() => {
  app = mount(<App cols={5} rows={5} />);
});

const getInput = (col_i, row_i) => {
  return app.find(`[name="${getKey({col_i, row_i})}"]`);
};

it('should render without crashing', () => {});

it('should have cells with an index', () => {
  expect(getInput(1, 1)).toHaveLength(1);
  expect(getInput(1, -1)).toHaveLength(0);
  expect(getInput(6, 1)).toHaveLength(0);
});

it('it can update cells', () => {
  const input = getInput(1, 1);

  // Test second render and effect
  act(() => {
    input.simulate('change', {target: {value: 'Foo'}});
  });

  app.update();
  expect(getInput(1, 1).prop('value')).toBe('Foo');
});
