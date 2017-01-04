import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUser, clearUser} from '../../../actions/index'
import PostItem from '../../items/post-item/post-item'
import StoryPlaceholder from '../../../components/placeholders/story-placeholder/story-placeholder'
import autobind from 'autobind-decorator'

class Stories extends Component {
  constructor (props) {
    super(props)

    this.state = {
      limit: 60
    }
  }

  componentWillMount () {
    this.props.fetchUser(this.props.params.id)
    window.addEventListener('scroll', this.handleOnScroll)
  }

  componentWillUnmount () {
    this.props.clearUser()
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  @autobind
  handleOnScroll () {
    const pctScrolled = Math.floor((window.pageYOffset/(window.innerHeight - document.body.scrollHeight) * 100) * -1) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    if (pctScrolled >= 85) {
      this.setState({
        limit: Math.min(this.state.limit + 30, this.props.items.length - 1)
      })
    }
  }

  renderPlaceholders () {
    const storyPlaceholders = []
    for (var i = 1; i < 41; i++) {
      storyPlaceholders.push(<StoryPlaceholder key={i} />)
    }
    return storyPlaceholders.map(story => {
      return story
    })
  }

  @autobind
  onTopClick () {
    window.scrollTo(0, 0)
  }

  renderStories () {
    return this.props.user.submitted.slice(0, this.state.limit + 1).map(story => {
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
        <button ref='button' onClick={this.onTopClick} className='pagination-button'>Top</button>
      </div>
    )
  }
}

function mapStateToProps ({users}) {
  return {user: users.user}
}

export default connect(mapStateToProps, {fetchUser, clearUser})(Stories)
