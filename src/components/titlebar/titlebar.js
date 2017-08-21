import './titlebar.styl'

import React from 'react'
import {Link} from 'react-router'
import Searchbar from '../../containers/searchbar/searchbar'

export default (props) => {
  return (
    <div className='title-bar'>
      <div className='title-bar-titles'>
        <Link to='/'>Top</Link>
        |
        <Link to='/new'>New</Link>
        |
        <Link to='/show'>Show</Link>
        |
        <Link to='/ask'>Ask</Link>
        |
        <Link to='/job'>Jobs</Link>
      </div>
      <Searchbar />
    </div>
  )
}
