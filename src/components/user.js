import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../actions/index'

class User extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.params.id)
  }

  renderPosts() {
    return this.props.user.comments.map(comment => {
      return (
        <div key={comment.id}>
          <p>{comment.text}</p>
        </div>
      )
    })
  }

  render() {
    if (!this.props.user.user) return <div>loading</div>
    const {id, karma} = this.props.user.user
    return (
      <div>
        <div className="user-header">
          <h1>{id}</h1>
          <h3>Karma: {karma}</h3>
        </div>
        <div>
          <h3>Comments made by this user</h3>        
          {this.renderPosts()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {fetchUser})(User)