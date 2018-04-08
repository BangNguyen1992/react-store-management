import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux'

import './index.css';

// import { todoApp } from './projects/reduxstagram/reducers'
import Router from './Router.jsx';
import registerServiceWorker from './registerServiceWorker';


// const store = createStore(todoApp)

ReactDOM.render(<Router />, document.getElementById('main'));
registerServiceWorker();

// render(<App />, document.getElementById('main'));
// registerServiceWorker();
