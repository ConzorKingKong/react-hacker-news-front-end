import 'intl'
import './index.styl'

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers/index'
import promise from 'redux-promise'
import {Provider} from 'react-redux'
import {IntlProvider} from 'react-intl'
import routes from './routes'
import thunk from 'redux-thunk'
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux'

const middleware = routerMiddleware(browserHistory)
const preStore = applyMiddleware(middleware, promise, thunk)(createStore)
export const store = preStore(reducers)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale='en-us'>
      <Router routes={routes} history={history} />
    </IntlProvider>
  </Provider>
    , document.querySelector('.container'))
