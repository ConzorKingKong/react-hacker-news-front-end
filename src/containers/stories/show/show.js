import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchStories, clearStories} from '../../../actions/index'
import PostItem from '../../items/post-item/post-item'
import StoryPlaceholder from '../../../components/placeholders/story-placeholder/story-placeholder'
import AlgoliaPost from '../../../components/algolia-post/algolia-post'
import autobind from 'autobind-decorator'

class ShowStories extends Component {
  constructor (props) {
    super(props)

    this.state = {
      limit: 40
    }
  }
  componentWillMount () {
    this.props.fetchStories('showstories')
    window.addEventListener('scroll', this.handleOnScroll)
  }

  @autobind
  handleOnScroll () {
    const button = this.refs.button
    const buttonRect = button.getBoundingClientRect()
    if (document.documentElement.clientHeight - buttonRect.top >= -40) {
      this.setState({
        limit: Math.min(this.state.limit + 20, this.props.items.length - 1)
      })
    }
  }


  componentWillUnmount () {
    this.props.clearStories()
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  @autobind
  onTopClick () {
    window.scrollTo(0, 0)
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
    return this.props.items.slice(0, this.state.limit + 1).map(id => {
      return <PostItem id={id} key={id} />
    })
  }

  render () {
    if (!this.props.items) return <div className='new-stories'><div className='posts-list'>{this.renderPlaceholders()}</div></div>
    return (
      <div className='new-stories'>
        <div className='posts-list'>
          {this.renderPosts()}
        </div>
        <button ref='button' onClick={this.onTopClick} className='pagination-button'>Top</button>
      </div>
    )
  }
}

function mapStateToProps ({items}) {
  return {items: items.items}
}

export default connect(mapStateToProps, {fetchStories, clearStories})(ShowStories)
