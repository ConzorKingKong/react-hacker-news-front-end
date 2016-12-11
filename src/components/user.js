import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUser, clearUser} from '../actions/index'
import {Link} from 'react-router'

class User extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.params.id)
  }

  componentWillUnmount() {
    this.props.clearUser()
  }

  render() {
    if (!this.props.user) return <div>loading</div>
    const {id, karma} = this.props.user
    return (
      <div>
        <div className="user-header">
          <h1>{id}</h1>
          <h3>Karma: {karma}</h3>
        </div>
        <div>
          <Link to={`/stories/${id}`}>Stories</Link>
          <Link to={`/comments/${id}`}>Comments</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {user: state.user.user}
}

export default connect(mapStateToProps, {fetchUser, clearUser})(User)