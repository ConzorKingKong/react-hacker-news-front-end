import React from 'react'
import {Link} from 'react-router'

export default (props) => {
  return (
    <div  key={props.id} className="posts-list-item">
      <Link to={`item/${props.id}`}>{props.title}</Link>
      <div className="posts-list-item-subtitle">
        <Link to={`user/${props.by}`}>{props.by}</Link>
      </div>
    </div>
  )
}