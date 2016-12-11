import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUser, clearUser} from '../actions/index'
import Comment from './comment'

class Comments extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.params.id)
  }

  componentWillUnmount() {
    this.props.clearUser()
  }

  renderComments() {
    return this.props.user.comments.filter(comment => {
      return comment.type === "comment"
    }).map(comment => {
      return <Comment id={comment.id} type="comment"/>
    })
  }

  render() {
    if (!this.props.user.comments) return <div>Loading</div>
    return (
      <div>
        {this.renderComments()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {fetchUser, clearUser})(Comments)