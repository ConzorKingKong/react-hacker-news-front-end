import {NEW_STORIES, ITEM} from '../actions/index'

const initialState = {items: null, item: null, comments: null}

export default function(state = initialState, action) {
  switch(action.type) {
    case NEW_STORIES:
      return {...state, items: action.payload}
    case ITEM:
      return {...state, item: action.payload, comments: action.comments}
  }
  return state
}