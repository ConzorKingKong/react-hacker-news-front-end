import './app.styl'

import React from 'react'
import Titlebar from '../titlebar/titlebar'

export default (props) => {
  return (
    <div className='wrapper'>
      <Titlebar />
      <div className='content'>
        {props.children}
      </div>
    </div>
  )
}
