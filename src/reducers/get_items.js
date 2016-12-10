import {NEW_STORIES, ITEM, CLEAR_STORIES, CLEAR_ITEM} from '../actions/index'

const initialState = {items: null, item: null, comments: null}

export default function(state = initialState, action) {
  switch(action.type) {
    case NEW_STORIES:
      return {...state, items: action.payload}
    case CLEAR_STORIES:
      return {...state, items: action.payload}
    case ITEM:
      return {...state, item: action.payload, comments: action.comments}
    case CLEAR_ITEM:
      return {...state, item: action.payload}
  }
  return state
}