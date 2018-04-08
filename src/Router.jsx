import React from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'react-router-redux';

// import StorePicker from './components/StorePicker';
import ProjectSelector from './components/ProjectSelector';
import NotFound from './components/NotFound';

import App from './projects/store-management/App.jsx';
import ReduxStagram from './projects/reduxstagram/App.jsx';

import store from './projects/reduxstagram/store';


const Router = () => {
  // console.log('object store', store.getState());
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ProjectSelector} />
          <Route path="/store/:storeId" component={App} />
          <Route path="/reduxstagram" component={ReduxStagram} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

// Router.propTypes = {
  // store: PropTypes.object.isRequired
// }

export default Router;