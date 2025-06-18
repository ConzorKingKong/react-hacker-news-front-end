import './post-item.css'

import React, { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FormattedRelativeTime } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListItem } from '../../../store/actions'
import StoryPlaceholder from '../../../components/placeholders/story-placeholder/story-placeholder.jsx'

const PostItem = ({ id }) => {
  const dispatch = useDispatch()
  const item = useSelector(state => state.items.itemsCache[id])

  useEffect(() => {
    if (!item) {
      dispatch(fetchListItem(id))
    }
  }, [dispatch, id, item])

  const dateInfo = useMemo(() => {
    if (!item?.time) return null
    
    const date = new Date(0)
    date.setUTCSeconds(item.time)
    const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000)
    
    return { date, secondsAgo }
  }, [item?.time])

  if (!item) return <StoryPlaceholder />
  if (item.type === 'comment') return null

  const domain = item.url ? new URL(item.url).hostname : ''
  const points = item.score === 1 ? 'point' : 'points'
  const comments = item.descendants === 1 ? 'comment' : 'comments'

  return (
    <div className='posts-list-item'>
      <div className='posts-list-header'>
        <div className='posts-list-item-score'>{item.score}</div>
        <h3 className='posts-list-item-title'><Link to={`/item/${id}`}>{item.title}</Link></h3>
      </div>
      <div className='posts-list-item-subtitle'>
        <div className='posts-list-item-by'>by</div>
        <Link className='posts-list-item-user' to={`/user/${item.by}`}>{item.by}</Link>
        {dateInfo && (
          <div className='posts-list-item-date' title={dateInfo.date.toString()}>
            <FormattedRelativeTime value={-dateInfo.secondsAgo} unit="second" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostItem