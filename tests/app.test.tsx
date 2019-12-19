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

it('can update cells', () => {
  act(() => {
    getInput(1, 1).simulate('change', {target: {value: 'Foo'}});
  });

  app.update();
  expect(getInput(1, 1).prop('value')).toBe('Foo');
});

it('can use simple formulae', () => {
  act(() => {
    getInput(1, 1).simulate('click');
    getInput(1, 1).simulate('change', {target: {value: '=1+3'}});
  });

  app.update();
  expect(getInput(1, 1).prop('value')).toBe('=1+3');

  act(() => {
    getInput(1, 2).simulate('click');
  });

  app.update();
  expect(getInput(1, 1).prop('value')).toBe(4);
});

it('does not parse formulae without =', () => {
  act(() => {
    getInput(1, 1).simulate('click');
    getInput(1, 1).simulate('change', {target: {value: '1+3'}});
  });

  app.update();
  expect(getInput(1, 1).prop('value')).toBe('1+3');

  act(() => {
    getInput(1, 2).simulate('click');
  });

  app.update();
  expect(getInput(1, 1).prop('value')).toBe('1+3');
});
