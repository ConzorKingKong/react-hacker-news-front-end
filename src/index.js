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

const store = applyMiddleware(promise, thunk)(createStore)

ReactDOM.render(
  <Provider store={store(reducers)}>
    <IntlProvider locale='en-us'>
      <Router routes={routes} history={browserHistory} />
    </IntlProvider>
  </Provider>
    , document.querySelector('.container'))
