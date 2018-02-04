import React from 'react'
import { render } from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import App from './containers/App'
import reducer from './reducers'
import mySaga from './sagas'

import 'todomvc-app-css/index.css'

const enhancers = []
const sagaMiddleware = createSagaMiddleware()

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  ...enhancers
)

const store = createStore(
  reducer,
  composedEnhancers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(mySaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
