import './comment.css'

import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FormattedRelativeTime } from 'react-intl'
import { apiQueue } from '../../../utils/apiQueue'

const Comment = ({ id, link }) => {
  const [comment, setComment] = useState(null)
  const [displayChild, setDisplayChild] = useState(true)
  const [showHide, setShowHide] = useState('[-]')

  const fetchComment = async (commentId) => {
    try {
      const data = await apiQueue.request(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
      setComment(data)
    } catch (error) {
      console.error('Error fetching comment:', error)
    }
  }

  useEffect(() => {
    fetchComment(id)
  }, [id])

  const handleShowHideClick = () => {
    if (displayChild) {
      const hideText = comment.kids ? `[+${comment.kids.length}]` : '[+]'
      setDisplayChild(false)
      setShowHide(hideText)
    } else {
      setDisplayChild(true)
      setShowHide('[-]')
    }
  }

  const renderChildren = () => {
    if (!comment.kids || !displayChild) return null
    
    return comment.kids.map(kid => (
      <div key={kid}>
        <Comment link={comment.id} id={kid} />
      </div>
    ))
  }

  const dateInfo = useMemo(() => {
    if (!comment?.time) return null
    
    const date = new Date(0)
    date.setUTCSeconds(comment.time)
    const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000)
    
    return { date, secondsAgo }
  }, [comment?.time])

  if (!comment || !comment.text || comment.text.trim() === '') return null
  if (comment.type !== 'comment') return null

  if (!displayChild) {
    return (
      <div className='comment' key={comment.id}>
        <div className='comment-header'>
          <div><a href={comment.url}>{comment.title}</a></div>
          <div className='comment-sub-header'>
            <div onClick={handleShowHideClick} className='show-hide'>{showHide}</div>
            <Link className='comment-sub-header-user' to={`/user/${comment.by}`}>{comment.by} </Link>
            {dateInfo && <FormattedRelativeTime value={-dateInfo.secondsAgo} unit="second" />}
            {link && <a className='parent' href={`#${link}`}>Parent</a>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='comment' id={comment.id} key={comment.id}>
      <div className='comment-header'>
        <div><a href={comment.url}>{comment.title}</a></div>
        <div className='comment-sub-header'>
          <div onClick={handleShowHideClick} className='show-hide'>{showHide}</div>
          <Link className='comment-sub-header-user' to={`/user/${comment.by}`}>{comment.by} </Link>
          {dateInfo && <FormattedRelativeTime value={-dateInfo.secondsAgo} unit="second" />}
          {link && <a className='parent' href={`#${link}`}>Parent</a>}
        </div>
      </div>
      <div className="comment-text" dangerouslySetInnerHTML={{__html: comment.text}} />
      {renderChildren()}
    </div>
  )
}

export default Comment