import {STORIES, ALGOLIA_ITEM, ITEM, CLEAR_STORIES, CLEAR_ITEM, SEARCH} from '../actions/index'

const initialState = {items: null, item: null, comments: null}

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_STORIES:
      return {...state, items: action.payload}
    case ITEM:
      return {...state, item: action.payload, comments: action.comments}
    case CLEAR_ITEM:
      return {...state, item: action.payload}
    case STORIES:
      return {...state, items: action.payload.data}
    case SEARCH:
      return {...state, items: action.payload.data}
    case ALGOLIA_ITEM:
      return {...state, item: action.payload.data}
  }
  return state
}
