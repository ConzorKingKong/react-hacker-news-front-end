import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearStories } from '../../store/actions'
import StoryPlaceholder from '../../components/placeholders/story-placeholder/story-placeholder.jsx'
import AlgoliaPost from '../../components/algolia-post/algolia-post.jsx'

const SearchResults = () => {
  const [limit, setLimit] = useState(30)
  const dispatch = useDispatch()
  const { searchResults } = useSelector(state => state.items)

  const handleOnScroll = useCallback(() => {
    if (!searchResults?.hits) return
    
    const pctScrolled = Math.floor((window.pageYOffset/(window.innerHeight - document.body.scrollHeight) * 100) * -1)
    if (pctScrolled >= 85) {
      setLimit(prevLimit => Math.min(prevLimit + 30, searchResults.hits.length - 1))
    }
  }, [searchResults])

  useEffect(() => {
    window.addEventListener('scroll', handleOnScroll)
    
    return () => {
      dispatch(clearStories())
      window.removeEventListener('scroll', handleOnScroll)
    }
  }, [dispatch, handleOnScroll])

  const onTopClick = () => {
    window.scrollTo(0, 0)
  }

  const renderPlaceholders = () => {
    return Array.from({ length: 30 }, (_, i) => (
      <StoryPlaceholder key={i + 1} />
    ))
  }

  const renderPosts = () => {
    return searchResults.hits.slice(0, limit).map(post => (
      <AlgoliaPost
        id={parseInt(post.objectID)}
        key={parseInt(post.objectID)}
        score={post.points}
        title={post.title}
        by={post.author}
        time={post.created_at_i}
      />
    ))
  }

  if (!searchResults) {
    return (
      <div className='new-stories'>
        <div className='posts-list'>{renderPlaceholders()}</div>
      </div>
    )
  }

  if (searchResults.hits?.length === 0) {
    return <div>No results for "{searchResults.query}"</div>
  }

  return (
    <div className='new-stories'>
      <div className='posts-list'>
        {renderPosts()}
      </div>
      <button onClick={onTopClick} className='pagination-button'>Top</button>
    </div>
  )
}

export default SearchResults