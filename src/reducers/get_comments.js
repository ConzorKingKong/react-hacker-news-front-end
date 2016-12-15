import {COMMENT} from '../actions/index'

const initialState = {comment: null}

export default (state = initialState, action) => {
  switch (action.type) {
    case COMMENT:
      return {...state, comment: action.payload}
  }
  return state
}
