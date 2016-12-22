import React from 'react'
import {Link} from 'react-router'
import {FormattedRelative} from 'react-intl'

export default (props) => {
  const utcSeconds = props.time
  const date = new Date(0)
  date.setUTCSeconds(utcSeconds)
  return (
    <div key={props.id} className='posts-list-item'>
      <div className='posts-list-item-score'>{props.score}</div>
      <Link className='posts-list-item-title' to={`item/${props.id}`}>{props.title}</Link>
      <div className='posts-list-item-by'>by</div>
      <Link className='posts-list-item-user' to={`user/${props.by}`}>{props.by}</Link>
      <FormattedRelative value={date} />
    </div>
  )
}
