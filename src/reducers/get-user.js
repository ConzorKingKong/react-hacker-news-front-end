import {CLEAR_USER, USER, ALGOLIA_USER} from '../actions/index'

const initialState = {user: {}, loading: true}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER:
      return {...state, user: action.payload.data, loading: false}
    case ALGOLIA_USER:
      return {...state, user: action.payload.data, loading: false}
    case CLEAR_USER:
      return {...state, user: action.payload, comments: action.payload}
    default:
      return state
  }
  return state
}
