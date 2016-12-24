import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clearStories, search} from '../../actions/index'
import StoryPlaceholder from '../../components/placeholders/story-placeholder/story-placeholder'
import AlgoliaPost from '../../components/algolia-post/algolia-post'
import autobind from 'autobind-decorator'
import './search-results.styl'

class SearchResults extends Component {
  constructor (props) {
    super(props)

    this.state = {
      limit: 40,
      page: 1
    }
  }

  componentWillUnmount () {
    this.props.clearStories()
  }

  @autobind
  onMoreClick () {
    this.setState({
      limit: this.state.limit + 20
    })
    this.props.search(this.props.items.items.query, this.state.limit)
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
    return this.props.items.items.hits.map(post => {
      return <AlgoliaPost id={parseInt(post.objectID)} key={parseInt(post.objectID)} score={post.points} title={post.title} by={post.author} time={post.created_at_i} />
    })
  }

  render () {
    if (!this.props.items.items) return <div className='new-stories'><div className='posts-list'>{this.renderPlaceholders()}</div></div>
    return (
      <div className='new-stories'>
        <div className='posts-list'>
          {this.renderPosts()}
        </div>
        <button onClick={this.onMoreClick} className='pagination-button'>More</button>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps, {clearStories, search})(SearchResults)
