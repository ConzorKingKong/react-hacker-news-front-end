import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../actions/index'

class User extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.params.id)
  }

  render() {
    if (!this.props.user.user) {
      return <div>loading</div>
    } else {
      console.log(this.props.user.user)
      return (
        <div>
          {this.props.user.user.id}
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {fetchUser})(User)