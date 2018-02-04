import {  SET_ERROR } from '../constants/ActionTypes'

const initialState = {
  message: '',
}

export default function errors(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        message: action.message,
      }
    default:
      return state
  }
}
