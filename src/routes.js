import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/app/app'
import NewStories from './containers/stories/new-stories/new-stories'
import Jobs from './containers/stories/jobs/jobs'
import TopStories from './containers/stories/top-stories/top-stories'
import Show from './containers/stories/show/show'
import Ask from './containers/stories/ask/ask'
import Item from './containers/items/item/item'
import User from './containers/user/user'
import FoOhFo from './components/error/404'
import Comments from './containers/comments/comments/comments'
import Stories from './containers/stories/stories/stories'
import SearchResults from './containers/search-results/search-results'

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
    <Route path='searchResults' component={SearchResults} />
    <Route path='*' component={FoOhFo} />
  </Route>
)
