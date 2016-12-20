import React from 'react'
import {Link} from 'react-router'

export default (props) => {
  return (
    <div className='title-bar'>
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
  )
}
