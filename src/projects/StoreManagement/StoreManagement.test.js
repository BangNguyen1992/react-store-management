import React from 'react';
import ReactDOM from 'react-dom';
import StoreManagement from './StoreManagement';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StoreManagement />, div);
  ReactDOM.unmountComponentAtNode(div);
});
