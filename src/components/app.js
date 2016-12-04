import React from 'react'
import {Link} from 'react-router'

export default (props) => {
  return (
    <div className="wrapper">
      <div className="title-bar">
        <Link to="/">New Stories</Link>
        <Link to="topstories">Top Stories</Link>
        <Link to="show">Show</Link>
        <Link to="ask">Ask</Link>
        <Link to="jobs">Jobs</Link>
      </div>
      <div className="content">
        {props.children}
      </div>
    </div>
  )
}