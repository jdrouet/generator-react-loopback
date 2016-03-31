import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import Root from './components/root'
import HomeView from './containers/home-view'

import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'

import configureStore from './store'

import counterpart from 'counterpart'
import localeFr from './locales/locale-fr.json'
import localeEn from './locales/locale-en.json'

import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

counterpart.registerTranslations('en', localeEn);
counterpart.registerTranslations('fr', localeFr);

const store = configureStore(hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,    
  }
});

injectTapEventPlugin();

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={history}>
        <Route path="/" component={Root}>
          <IndexRoute component={HomeView} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('content')
);
