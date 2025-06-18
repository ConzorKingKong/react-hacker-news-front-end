import './item.css'

import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { fetchItem, clearItem } from '../../../store/actions'
import AlgoliaComment from '../../comments/algolia-comment/algolia-comment.jsx'
import { FormattedRelativeTime } from 'react-intl'
import ItemPlaceholder from '../../../components/placeholders/item-placeholder/item-placeholder.jsx'

const Item = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { item, loading } = useSelector(state => state.items)

  useEffect(() => {
    dispatch(fetchItem(id))
    
    return () => {
      dispatch(clearItem())
    }
  }, [dispatch, id])

  const onTopClick = () => {
    window.scrollTo(0, 0)
  }

  const renderComments = () => {
    if (!item?.children) return null
    
    return item.children.map(comment => (
      <AlgoliaComment
        children={comment.children}
        author={comment.author}
        url={comment.url}
        time={comment.created_at_i}
        text={comment.text}
        link={id}
        id={comment.id}
        key={comment.id}
      />
    ))
  }

  const dateInfo = useMemo(() => {
    if (!item?.created_at_i) return null
    
    const date = new Date(0)
    date.setUTCSeconds(item.created_at_i)
    const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000)
    
    return { date, secondsAgo }
  }, [item?.created_at_i])

  if (loading || !item) return <ItemPlaceholder />

  const { url, title, points, author, text } = item

  return (
    <div className='item' id={id}>
      <a className='item-title' href={url}>{title}</a>
      <div className='item-subtitle'>
        <div className='item-subtitle-user-info'>{points} Points by <Link to={`/user/${author}`}>{author}</Link></div>
        {dateInfo && <FormattedRelativeTime value={-dateInfo.secondsAgo} unit="second" />}
      </div>
      <div className='item-text' dangerouslySetInnerHTML={{__html: text}} />
      <div className='comment-list'>{renderComments()}</div>
      <button onClick={onTopClick} className='pagination-button'>Top</button>
    </div>
  )
}

export default Item