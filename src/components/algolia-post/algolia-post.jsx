import React, { useMemo } from 'react'
import {Link} from 'react-router-dom'
import {FormattedRelativeTime} from 'react-intl'

export default (props) => {
  const dateInfo = useMemo(() => {
    if (!props.time) return null
    
    const date = new Date(0)
    date.setUTCSeconds(props.time)
    const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000)
    
    return { date, secondsAgo }
  }, [props.time])

  return (
    <div key={props.id} className='posts-list-item'>
      <div className='posts-list-header'>
        <div className='posts-list-item-score'>{props.score}</div>
        <Link className='posts-list-item-title' to={`item/${props.id}`}>{props.title}</Link>
      </div>
      <div className='posts-list-item-subtitle'>
        <div className='posts-list-item-by'>by</div>
        <Link className='posts-list-item-user' to={`user/${props.by}`}>{props.by}</Link>
        {dateInfo && (
          <div className='posts-list-item-date' title={dateInfo.date.toString()}>
            <FormattedRelativeTime value={-dateInfo.secondsAgo} unit="second" />
          </div>
        )}
      </div>
    </div>
  )
}
