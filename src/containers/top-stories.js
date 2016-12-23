import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchStories, clearStories, search} from '../actions/index'
import PostItem from './post-item'
import StoryPlaceholder from '../components/story-placeholder'
import AlgoliaPost from '../components/algolia-post'
import autobind from 'autobind-decorator'

class TopStories extends Component {
  constructor (props) {
    super(props)

    this.state = {
      limit: 20,
      page: 1
    }
  }
  componentWillMount () {
    this.props.fetchStories('topstories')
  }

  componentWillUnmount () {
    this.props.clearStories()
  }

  @autobind
  onMoreClick () {
    if (!this.props.items.hits) {
      this.setState({
        limit: Math.min(this.state.limit + 20, this.props.items.length - 1)
      })
      return
    }
    this.setState({
      limit: this.state.limit + 20
    })
    this.props.search(this.props.items.query, this.state.limit)
  }

  renderPlaceholders () {
    const storyPlaceholders = []
    for (var i = 1; i < 21; i++) {
      storyPlaceholders.push(<StoryPlaceholder key={i} />)
    }
    return storyPlaceholders.map(story => {
      return story
    })
  }

  renderPosts () {
    if (!this.props.items.hits) {
      return this.props.items.slice(0, this.state.limit + 1).map(id => {
        return <PostItem id={id} key={id} />
      })
    }
    return this.props.items.hits.map(post => {
      return <AlgoliaPost id={parseInt(post.objectID)} key={parseInt(post.objectID)} score={post.points} title={post.title} by={post.author} time={post.created_at_i} />
    })
  }

  render () {
    if (!this.props.items) return <div className='new-stories'><div className='posts-list'>{this.renderPlaceholders()}</div></div>
    return (
      <div className='new-stories'>
        <div className='posts-list'>
          {this.renderPosts()}
        </div>
        <button onClick={this.onMoreClick} className='pagination-button'>More</button>
        <div>{this.state.warning}</div>
      </div>
    )
  }
}

function mapStateToProps ({items}) {
  if (items.hits) {
    return {items: items.hits}
  }
  return {items: items.items}
}

export default connect(mapStateToProps, {fetchStories, clearStories, search})(TopStories)
