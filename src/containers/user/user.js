import './user.styl'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clearUser, user} from '../../actions/index'
import {Link} from 'react-router'
import UserPlaceholder from '../../components/placeholders/user-placeholder/user-placeholder'

class User extends Component {
  componentWillMount () {
    this.props.user(this.props.params.id)
  }

  componentWillUnmount () {
    this.props.clearUser()
  }

  render () {
    console.log(this.props.users)
    if (this.props.users.loading) return <UserPlaceholder />
    if (!this.props.users.user) return <div>This user does not exist</div>
    const {objectID, karma} = this.props.users.user
    return (
      <div className='user'>
        <div className='user-header'>
          <h1>{objectID}</h1>
          <h3>Karma: {karma}</h3>
          <Link to={`/stories/${objectID}`}>Stories</Link>
          <Link to={`/comments/${objectID}`}>Comments</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps, {user, clearUser})(User)
