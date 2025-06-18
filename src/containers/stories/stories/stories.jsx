import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStories, clearStories } from '../../../store/actions'
import PostItem from '../../items/post-item/post-item'
import StoryPlaceholder from '../../../components/placeholders/story-placeholder/story-placeholder'
import './stories.css'

const Stories = ({ type }) => {
  const [limit, setLimit] = useState(40)
  const dispatch = useDispatch()
  const { items, loading } = useSelector(state => state.items)

  useEffect(() => {
    dispatch(fetchStories(`${type}stories`))
    
    return () => {
      dispatch(clearStories())
    }
  }, [dispatch, type])

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

  const renderStories = () => {
    return items.slice(0, limit + 1).map(id => (
      <PostItem key={id} id={id} />
    ))
  }

  if (loading || !items) {
    return (
      <div className='stories'>
        <div className='posts-list'>{renderPlaceholders()}</div>
      </div>
    )
  }

  return (
    <div className='stories'>
      <div className='posts-list'>
        {renderStories()}
      </div>
      <button onClick={onTopClick} className='pagination-button'>Top</button>
    </div>
  )
}

export default Stories