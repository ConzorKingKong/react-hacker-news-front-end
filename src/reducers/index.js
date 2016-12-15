import {combineReducers} from 'redux'
import ItemsReducer from './get_items'
import UserReducer from './get_user'
import CommentReducer from './get_comments'

const rootReducer = combineReducers({
  items: ItemsReducer,
  user: UserReducer,
  comment: CommentReducer
})

export default rootReducer
