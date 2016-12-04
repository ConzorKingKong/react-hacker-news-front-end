import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/app'
import HomePage from './components/homepage'
import Jobs from './components/jobs'
import TopStories from './components/top_stories'
import Show from './components/show'
import Ask from './components/ask'
import Item from './components/item'
import User from './components/user'
import FoOhFo from './components/404'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="jobs" component={Jobs} />        
    <Route path="topstories" component={TopStories} />
    <Route path="show" component={Show} />
    <Route path="ask" component={Ask} />
    <Route path="item/:id" component={Item} />
    <Route path="user/:id" component={User} />
    <Route path="*" component={FoOhFo} />    
  </Route>
)