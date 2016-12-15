import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserInfo, clearUser} from '../actions/index'
import Comment from './comment'
import StoryPlaceholder from './story_placeholder'

class Comments extends Component {
  componentWillMount () {
    this.props.fetchUserInfo(this.props.params.id)
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

// need a return for if there are no stories
  renderStories () {
    return this.props.user.comments.filter(comment => {
      return comment.type !== 'comment'
    }).map(comment => {
      return <Comment key={comment.id} id={comment.id} type='non-comment' />
    })
  }

  render () {
    if (!this.props.user.comments) return <div className='posts-list'>{this.renderPlaceholders()}</div>
    console.log(this.props.user.comments)
    return (
      <div className='posts-list'>
        {this.renderStories()}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps, {fetchUserInfo, clearUser})(Comments)
