import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import language from './language'

export default combineReducers({
  language,
  routing: routerReducer
});
