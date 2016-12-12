import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUser, clearUser} from '../actions/index'
import Comment from './comment'
import LoadingCircle from './loadingCircle'

class Comments extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.params.id)
  }

  componentWillUnmount() {
    this.props.clearUser()
  }

// need a return for if there are no stories
  renderStories() {
    return this.props.user.comments.filter(comment => {
      return comment.type !== "comment"
    }).map(comment => {
      return <Comment id={comment.id} type="non-comment"/>
    })
  }

  render() {
    if (!this.props.user.comments) return <LoadingCircle />
    return (
      <div className="stories">
        {this.renderStories()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {fetchUser, clearUser})(Comments)