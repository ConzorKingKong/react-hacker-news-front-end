import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUser, clearUser} from '../actions/index'
import Comment from './comment'
import CommentPlaceholder from '../components/comment-placeholder'

class Comments extends Component {
  componentWillMount () {
    this.props.fetchUser(this.props.params.id)
  }

  componentWillUnmount () {
    this.props.clearUser()
  }

  renderPlaceholders () {
    const CommentPlaceholders = []
    for (var i = 1; i < 40; i++) {
      CommentPlaceholders.push(<CommentPlaceholder key={i} />)
    }
    return CommentPlaceholders.map(story => {
      return story
    })
  }

  renderComments () {
    return this.props.user.submitted.map(comment => {
      return <Comment key={comment} id={comment} />
    })
  }

  render () {
    if (!this.props.user) return <div className='posts-list'>{this.renderPlaceholders()}</div>
    return (
      <div>
        <div>
          {this.renderComments()}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({user}) {
  return {user: user.user}
}

export default connect(mapStateToProps, {fetchUser, clearUser})(Comments)
