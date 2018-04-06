import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import StorePicker from './components/StorePicker';
import App from './App.jsx';
import ProjectSelector from './components/ProjectSelector';
import NotFound from './components/NotFound';

const Router = (props) => {
  return (<BrowserRouter>
    <Switch>
      <Route exact path="/" component={ProjectSelector} />
      <Route path="/store/:storeId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
  )
}

export default Router;