import * as React from 'react';
import {shallow} from 'enzyme';
import {App} from '../src/components/App';

test('App renders without crashing', () => {
  const checkbox = shallow(<App cols={5} rows={5} />);
});
