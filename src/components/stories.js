import React, {Component} from 'react'
import {connect} from 'react-redux'

class Stories extends Component {
  render() {
    return (
      <div>Fix later</div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(Stories)