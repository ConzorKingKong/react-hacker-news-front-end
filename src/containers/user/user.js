import './user.styl'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUser, clearUser} from '../../actions/index'
import {Link} from 'react-router'
import UserPlaceholder from '../../components/placeholders/user-placeholder/user-placeholder'

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
      <div className='user'>
        <div className='user-header'>
          <h1>{id}</h1>
          <h3>Karma: {karma}</h3>
          <Link to={`/stories/${id}`}>Stories</Link>
          <Link to={`/comments/${id}`}>Comments</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {user: state.user.user}
}

export default connect(mapStateToProps, {fetchUser, clearUser})(User)
