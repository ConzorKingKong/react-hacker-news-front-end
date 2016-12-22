import React from 'react'
import {Link} from 'react-router'
import Searchbar from '../components/searchbar'

export default (props) => {
  return (
    <div className='title-bar'>
      <div className='title-bar-titles'>
        <Link to='/'>Top</Link>
        |
        <Link to='/newstories'>New</Link>
        |
        <Link to='/show'>Show</Link>
        |
        <Link to='/ask'>Ask</Link>
        |
        <Link to='/jobs'>Jobs</Link>
      </div>
      <Searchbar />
    </div>
  )
}
