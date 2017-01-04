import {combineReducers} from 'redux'
import ItemsReducer from './get-items'
import UserReducer from './get-user'
import {routerReducer} from 'react-router-redux'

const rootReducer = combineReducers({
  items: ItemsReducer,
  users: UserReducer,
  routing: routerReducer
})

export default rootReducer
