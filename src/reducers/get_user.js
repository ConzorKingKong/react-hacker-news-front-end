import {USER} from '../actions/index'

const initialState = {user: null}

export default (state = initialState, action) => {
  switch(action.type) {
    case USER:
      return {...state, user: action.payload.data}
    default:
      return state
  }
}