import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUser, clearUser} from '../actions/index'
import Comment from './comment'
import StoryPlaceholder from '../containers/story_placeholder'

class Comments extends Component {
  componentWillMount () {
    this.props.fetchUser(this.props.params.id)
  }

  componentWillUnmount () {
    this.props.clearUser()
  }

  renderPlaceholders () {
    const storyPlaceholders = []
    for (var i = 1; i < 40; i++) {
      storyPlaceholders.push(<StoryPlaceholder key={i} />)
    }
    return storyPlaceholders.map(story => {
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
        {this.renderComments()}
      </div>
    )
  }
}

function mapStateToProps ({user}) {
  return {user: user.user}
}

export default connect(mapStateToProps, {fetchUser, clearUser})(Comments)
