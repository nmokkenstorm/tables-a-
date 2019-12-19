import * as React from 'react';
import {mount, shallow} from 'enzyme';
import {Simulate} from 'react-dom/test-utils';
import {App, getKey} from '../src/components/App';

const createApp = () => {
  return mount(<App cols={5} rows={5} />);
};

it('should render without crashing', () => {
  const app = createApp();
});

it('should have cells with an index', () => {
  const wrapper = createApp();

  expect(wrapper.find(`[name="${getKey({col_i: 1, row_i: 1})}"]`)).toHaveLength(
    1,
  );

  expect(wrapper.find(`[name="${getKey({col_i: 6, row_i: 1})}"]`)).toHaveLength(
    0,
  );

  expect(wrapper.find(`[name="${getKey({col_i: 1, row_i: 6})}"]`)).toHaveLength(
    0,
  );
});
