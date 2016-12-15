import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUser, clearUser} from '../actions/index'
import {Link} from 'react-router'
import UserPlaceholder from './user_placeholder'

class User extends Component {
  componentWillMount () {
    this.props.fetchUser(this.props.params.id)
  }

  componentWillUnmount () {
    this.props.clearUser()
  }

  render () {
    if (!this.props.user) return <UserPlaceholder />
    const {id, karma} = this.props.user
    return (
      <UserPlaceholder />
    )
  }
}

function mapStateToProps (state) {
  return {user: state.user.user}
}

export default connect(mapStateToProps, {fetchUser, clearUser})(User)
