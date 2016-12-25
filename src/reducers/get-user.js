import {CLEAR_USER, USER, ALGOLIA_USER} from '../actions/index'

const initialState = {user: null, comments: null}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER:
      return {...state, user: action.payload.data}
    case ALGOLIA_USER:
      return {...state, user: action.payload.data}
    case CLEAR_USER:
      return {...state, user: action.payload, comments: action.payload}
    default:
      return state
  }
  return state
}
