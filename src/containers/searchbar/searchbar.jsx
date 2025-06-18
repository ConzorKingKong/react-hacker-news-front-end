import './searchbar.css'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { search, clearStories } from '../../store/actions'

const Searchbar = () => {
  const [term, setTerm] = useState('')
  const [type, setType] = useState('story')
  const [by, setBy] = useState('search')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector(state => state.items.items)

  const handleInputChange = (event) => {
    setTerm(event.target.value)
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()
    if (items) dispatch(clearStories())
    dispatch(search({ term, by, type }))
    navigate('/search')
  }

  const onTypeChange = (event) => {
    setType(event.target.value)
  }

  const onByChange = (event) => {
    setBy(event.target.value)
  }

  return (
    <div className='searchbar-wrapper'>
      <form onSubmit={handleSubmitForm}>
        <input 
          id="search-input"
          name="search"
          placeholder='Search' 
          value={term} 
          onChange={handleInputChange} 
          type='text'
          autoComplete="off"
        />
        <div className='select-wrapper'>
          in
          <select 
            id="search-type"
            name="type"
            value={type} 
            onChange={onTypeChange}
          >
            <option value='story'>Stories</option>
            <option value='front_page'>Front Page</option>
            <option value='show_hn'>Show Hacker News</option>
            <option value='ask_hn'>Ask Hacker News</option>
            <option value='poll'>Polls</option>
          </select>
          by
          <select 
            id="search-by"
            name="by"
            value={by} 
            onChange={onByChange}
          >
            <option value='search'>Relevance</option>
            <option value='search_by_date'>Date</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default Searchbar