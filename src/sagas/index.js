import { call, put, takeEvery } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

function getData(searchStr) {
  const url = 'http://localhost:3001/test'
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-cache',
    body: JSON.stringify({
      searchStr: searchStr,
    }),
  })
    .then(res => res.json())
    .then(res => res)
    .catch(() => ({data: '', errorMessage: 'Could not add note'}))
}

function* addTodo({text}) {
  const result = yield call(getData, text)

  if (result.data) {
    yield put({type: types.ADD_SUCCESSED, text: text, saga: result.data})
    yield put({type: types.SET_ERROR, message: ''})
  }
  else {
    yield put({type: types.SET_ERROR, message: result.errorMessage})
  }
}

function* mySaga() {
  yield takeEvery(types.ADD_TODO, addTodo);
}

export default mySaga;
