import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push, syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// import { BrowserRouter,  HashRouter, Route, Switch } from 'react-router-dom';

// import root reducer
import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from './data/posts';

const defaultsState = {
  posts, comments
};

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  rootReducer,
  defaultsState,
  applyMiddleware(middleware)
)

// const store = createStore(rootReducer, defaultsState);

// export const myHistory = syncHistoryWithStore(BrowserRouter, store)

export default store;