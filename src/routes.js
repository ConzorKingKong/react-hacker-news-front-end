import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/app'
import NewStories from './containers/new-stories'
import Jobs from './containers/jobs'
import TopStories from './containers/top-stories'
import Show from './containers/show'
import Ask from './containers/ask'
import Item from './containers/item'
import User from './containers/user'
import FoOhFo from './components/404'
import Comments from './containers/comments'
import Stories from './containers/stories'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={TopStories} />
    <Route path='item/:id' component={Item} />
    <Route path='user/:id' component={User} />
    <Route path='comments/:id' component={Comments} />
    <Route path='stories/:id' component={Stories} />
    <Route path='jobs' component={Jobs} />
    <Route path='newstories' component={NewStories} />
    <Route path='show' component={Show} />
    <Route path='ask' component={Ask} />
    <Route path='*' component={FoOhFo} />
  </Route>
)
