import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clearStories, fetchStories} from '../actions/index'
import PostItem from './post_item'
import StoryPlaceholder from '../containers/story_placeholder'

class AskStories extends Component {
  componentWillMount () {
    this.props.fetchStories('askstories')
  }

  componentWillUnmount () {
    this.props.clearStories()
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

  renderPosts () {
    return this.props.items.map(id => {
      return (
        <PostItem key={id} id={id} />
      )
    })
  }

  render () {
    if (!this.props.items) return <div className='posts-list'>{this.renderPlaceholders()}</div>
    return (
      <div className='posts-list'>
        {this.renderPosts()}
      </div>
    )
  }
}

function mapStateToProps ({items}) {
  return {items: items.items}
}

export default connect(mapStateToProps, {fetchStories, clearStories})(AskStories)
