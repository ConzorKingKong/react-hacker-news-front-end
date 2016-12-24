import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUser, clearUser} from '../../../actions/index'
import PostItem from '../../items/post-item/post-item'
import StoryPlaceholder from '../../../components/placeholders/story-placeholder/story-placeholder'

class Stories extends Component {
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

  renderStories () {
    return this.props.user.submitted.map(story => {
      return <PostItem key={story} id={story} />
    })
  }

  render () {
    if (!this.props.user) return <div className='stories'><div className='posts-list'>{this.renderPlaceholders()}</div></div>
    return (
      <div className='stories'>
        <div className='posts-list'>
          {this.renderStories()}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({user}) {
  return {user: user.user}
}

export default connect(mapStateToProps, {fetchUser, clearUser})(Stories)
