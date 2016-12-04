import {combineReducers} from 'redux'
import ItemsReducer from './get_items'

const rootReducer = combineReducers({
  items: ItemsReducer
})

export default rootReducer