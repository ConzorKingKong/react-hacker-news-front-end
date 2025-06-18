import './comments.css'

import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUser, clearUser } from '../../../store/actions'
import Comment from '../comment/comment.jsx'
import CommentPlaceholder from '../../../components/placeholders/comment-placeholder/comment-placeholder.jsx'

const Comments = () => {
  const [limit, setLimit] = useState(40)
  const { id } = useParams()
  const dispatch = useDispatch()
  const { user, loading } = useSelector(state => state.users)

  const handleOnScroll = useCallback(() => {
    if (!user?.submitted) return
    
    const pctScrolled = Math.floor((window.pageYOffset/(window.innerHeight - document.body.scrollHeight) * 100) * -1)
    if (pctScrolled >= 85) {
      setLimit(prevLimit => Math.min(prevLimit + 30, user.submitted.length - 1))
    }
  }, [user])

  useEffect(() => {
    dispatch(fetchUser(id))
    window.addEventListener('scroll', handleOnScroll)
    
    return () => {
      dispatch(clearUser())
      window.removeEventListener('scroll', handleOnScroll)
    }
  }, [dispatch, id, handleOnScroll])

  const onTopClick = () => {
    window.scrollTo(0, 0)
  }

  const renderPlaceholders = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <CommentPlaceholder key={i + 1} />
    ))
  }

  const renderComments = () => {
    return user.submitted.slice(0, limit + 1).map(commentId => (
      <Comment key={commentId} id={commentId} />
    ))
  }

  if (loading) {
    return <div className='posts-list'>{renderPlaceholders()}</div>
  }

  if (!user) {
    return <div>No comments</div>
  }

  return (
    <div className='comment-page'>
      <div>
        {renderComments()}
      </div>
      <button onClick={onTopClick} className='pagination-button'>Top</button>
    </div>
  )
}

export default Comments