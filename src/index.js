import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers/index'
import promise from 'redux-promise'
import css from '../style/style'
import HomePage from './components/homepage'
import {Provider} from 'react-redux'
import routes from './routes'

const store = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={store(reducers)}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
    , document.querySelector(".container"))