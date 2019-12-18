import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './components/App';

import './app.css';

ReactDOM.render(<App cols={20} rows={20} />, document.getElementById('app'));
