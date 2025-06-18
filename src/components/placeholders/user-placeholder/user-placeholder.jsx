import React from 'react'
import './user-placeholder.css'

export default (props) => {
  return (
    <div className='user-placeholder'>
      <div className='user-placeholder-inner-wrapper'>
        <div className='user-placeholder-name' />
        <div className='user-placeholder-karma' />
        <div className='user-placeholder-story' />
        <div className='user-placeholder-comment' />
      </div>
    </div>
  )
}
