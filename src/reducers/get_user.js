import {USER_INFO, CLEAR_USER, USER} from '../actions/index'

const initialState = {user: null, comments: null}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER:
      return {...state, user: action.payload.data}
    case USER_INFO:
      return {...state, user: action.payload, comments: action.comments}
    case CLEAR_USER:
      return {...state, user: action.payload, comments: action.payload}
    default:
      return state
  }
}
