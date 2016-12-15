import React, {Component} from 'react'
import {connect} from 'react-redux'

class LoadingCircle extends Component {

  render () {
    return (
      <div className='cover'>
        <div className='circle' data-status='loading' />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps)(LoadingCircle)
