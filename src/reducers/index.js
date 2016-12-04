import {combineReducers} from 'redux'
import ItemsReducer from './get_items'
import UserReducer from './get_user'

const rootReducer = combineReducers({
  items: ItemsReducer,
  user: UserReducer
})

export default rootReducer