import React, { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStories, clearStories } from '../../../store/actions'
import PostItem from '../../items/post-item/post-item'
import StoryPlaceholder from '../../../components/placeholders/story-placeholder/story-placeholder'
import './all-stories.css'

const AllStories = () => {
  const [limit, setLimit] = useState(40)
  const location = useLocation()
  const dispatch = useDispatch()
  const items = useSelector(state => state.items.items)

  const getStoryType = (pathname) => {
    return pathname === '/' ? 'topstories' : `${pathname.slice(1)}stories`
  }

  useEffect(() => {
    dispatch(fetchStories(getStoryType(location.pathname)))
    
    return () => {
      dispatch(clearStories())
    }
  }, [dispatch, location.pathname])

  const handleOnScroll = useCallback(() => {
    const pctScrolled = Math.floor((window.pageYOffset/(window.innerHeight - document.body.scrollHeight) * 100) * -1)
    if (pctScrolled >= 85 && items) {
      setLimit(prevLimit => Math.min(prevLimit + 30, items.length - 1))
    }
  }, [items])

  useEffect(() => {
    window.addEventListener('scroll', handleOnScroll)
    return () => {
      window.removeEventListener('scroll', handleOnScroll)
    }
  }, [handleOnScroll])

  const onTopClick = () => {
    window.scrollTo(0, 0)
  }

  const renderPlaceholders = () => {
    return Array.from({ length: 40 }, (_, i) => (
      <StoryPlaceholder key={i + 1} />
    ))
  }

  const renderPosts = () => {
    return items.slice(0, limit + 1).map(id => (
      <PostItem id={id} key={id} />
    ))
  }

  if (!items) {
    return (
      <div className='stories'>
        <div className='posts-list'>{renderPlaceholders()}</div>
      </div>
    )
  }

  return (
    <div className='stories'>
      <div className='posts-list'>
        {renderPosts()}
      </div>
      <button onClick={onTopClick} className='pagination-button'>Top</button>
    </div>
  )
}

export default AllStories