import {applyMiddleware, createStore, compose, combineReducers} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'

export default function configureStore(history, initialState) {

  const logger = createLogger();
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = applyMiddleware(
    reduxRouterMiddleware,
    thunk,
    logger
  );
  const store = createStore(rootReducer, middleware);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer);
    })
  }

  return store;
}
