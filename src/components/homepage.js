import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchNewStories, clearStories} from '../actions/index'
import PostItem from './post_item'
import StoryPlaceholder from './story_placeholder'

class HomePage extends Component {
  componentWillMount () {
    this.props.fetchNewStories()
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
    return this.props.items.items.map(({time, score, id, title, by}) => {
      return (
        <PostItem key={id} time={time} score={score} id={id} by={by} title={title} />
      )
    })
  }

  render () {
    if (!this.props.items.items) return <div className='posts-list'>{this.renderPlaceholders()}</div>
    return (
      <div className='posts-list'>
        {this.renderPosts()}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps, {fetchNewStories, clearStories})(HomePage)
