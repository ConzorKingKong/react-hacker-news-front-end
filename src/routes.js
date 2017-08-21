import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/app/app'
import Item from './containers/items/item/item'
import User from './containers/user/user'
import FoOhFo from './components/error/404'
import Comments from './containers/comments/comments/comments'
import Stories from './containers/stories/stories/stories'
import SearchResults from './containers/search-results/search-results'
import AllStories from './containers/stories/all-stories/all-stories'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={AllStories} />
    <Route path='item/:id' component={Item} />
    <Route path='user/:id' component={User} />
    <Route path='comments/:id' component={Comments} />
    <Route path='stories/:id' component={Stories} />
    <Route path='job' component={AllStories} />
    <Route path='new' component={AllStories} />
    <Route path='show' component={AllStories} />
    <Route path='ask' component={AllStories} />
    <Route path='search' component={SearchResults} />
    <Route path='*' component={FoOhFo} />
  </Route>
)
