import './app.css'

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Titlebar from '../titlebar/titlebar.jsx'
import AllStories from '../../containers/stories/all-stories/all-stories.jsx'
import Stories from '../../containers/stories/stories/stories.jsx'
import Item from '../../containers/items/item/item.jsx'
import User from '../../containers/user/user.jsx'
import Comments from '../../containers/comments/comments/comments.jsx'
import SearchResults from '../../containers/search-results/search-results.jsx'
import Error404 from '../error/404.jsx'

const App = () => {
  return (
    <div className='wrapper'>
      <Titlebar />
      <div className='content'>
        <Routes>
          <Route path="/" element={<AllStories />} />
          <Route path="/top" element={<AllStories />} />
          <Route path="/new" element={<Stories type="new" />} />
          <Route path="/show" element={<Stories type="show" />} />
          <Route path="/ask" element={<Stories type="ask" />} />
          <Route path="/job" element={<Stories type="job" />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/comments/:id" element={<Comments />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
