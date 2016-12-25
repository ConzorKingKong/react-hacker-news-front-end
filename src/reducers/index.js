import {combineReducers} from 'redux'
import ItemsReducer from './get-items'
import UserReducer from './get-user'

const rootReducer = combineReducers({
  items: ItemsReducer,
  users: UserReducer
})

export default rootReducer
