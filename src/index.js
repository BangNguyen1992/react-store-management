import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router.jsx';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Router />, document.getElementById('main'));
registerServiceWorker();

// render(<App />, document.getElementById('main'));
// registerServiceWorker();
