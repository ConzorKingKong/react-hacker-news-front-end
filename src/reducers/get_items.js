import {NEW_STORIES, ITEM} from '../actions/index'

const initialState = {items: [], item: []}

export default function(state = initialState, action) {
  switch(action.type) {
    case NEW_STORIES:
      return {...state, items: action.payload.data}
    case ITEM:
      return {...state, item: action.payload.data}
    default:
      return state
  }
}