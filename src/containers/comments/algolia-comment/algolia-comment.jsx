import '../comment/comment.css'

import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FormattedRelativeTime } from 'react-intl'

const AlgoliaComment = ({ children, author, url, time, text, link, id, title }) => {
  const [displayChild, setDisplayChild] = useState(true)
  const [showHide, setShowHide] = useState('[-]')

  const handleShowHideClick = () => {
    if (displayChild) {
      const hideText = children?.length === 0 ? '[+]' : `[+${children?.length || 0}]`
      setDisplayChild(false)
      setShowHide(hideText)
    } else {
      setDisplayChild(true)
      setShowHide('[-]')
    }
  }

  const renderChildren = () => {
    if (!children || !displayChild) return null
    
    return children.map(child => (
      <div key={child.id}>
        <AlgoliaComment
          children={child.children}
          author={child.author}
          url={child.url}
          time={child.created_at_i}
          text={child.text}
          link={child.parent_id}
          id={child.id}
        />
      </div>
    ))
  }

  const dateInfo = useMemo(() => {
    if (!time) return null
    
    const date = new Date(0)
    date.setUTCSeconds(time)
    const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000)
    
    return { date, secondsAgo }
  }, [time])

  if (!text || text.trim() === '') return null

  if (!displayChild) {
    return (
      <div className='comment' key={id}>
        <div className='comment-header'>
          <div><a href={url}>{title}</a></div>
          <div className='comment-sub-header'>
            <div onClick={handleShowHideClick} className='show-hide'>{showHide}</div>
            <Link className='comment-sub-header-user' to={`/user/${author}`}>{author} </Link>
            {dateInfo && <FormattedRelativeTime value={-dateInfo.secondsAgo} unit="second" />}
            {link && <a className='parent' href={`#${link}`}>Parent</a>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='comment' id={id} key={id}>
      <div className='comment-header'>
        <div><a href={url}>{title}</a></div>
        <div className='comment-sub-header'>
          <div onClick={handleShowHideClick} className='show-hide'>{showHide}</div>
          <Link className='comment-sub-header-user' to={`/user/${author}`}>{author} </Link>
          {dateInfo && <FormattedRelativeTime value={-dateInfo.secondsAgo} unit="second" />}
          {link && <a className='parent' href={`#${link}`}>Parent</a>}
        </div>
      </div>
      <div className="comment-text" dangerouslySetInnerHTML={{__html: text}} />
      {renderChildren()}
    </div>
  )
}

export default AlgoliaComment