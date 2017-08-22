import './comments.styl'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUser, clearUser} from '../../../actions/index'
import Comment from '../comment/comment'
import CommentPlaceholder from '../../../components/placeholders/comment-placeholder/comment-placeholder'
import autobind from 'autobind-decorator'

class Comments extends Component {
  constructor (props) {
    super(props)

    this.state = {
      limit: 40
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
        limit: Math.min(this.state.limit + 30, this.props.user.submitted.length - 1)
      })
    }
  }

  renderPlaceholders () {
    const CommentPlaceholders = []
    for (var i = 1; i < 21; i++) {
      CommentPlaceholders.push(<CommentPlaceholder key={i} />)
    }
    return CommentPlaceholders.map(story => {
      return story
    })
  }

  renderComments () {
    return this.props.user.submitted.slice(0, this.state.limit + 1).map(comment => {
      return <Comment key={comment} id={comment} />
    })
  }

  @autobind
  onTopClick () {
    window.scrollTo(0, 0)
  }

  render () {
    if (this.props.loading) return <div className='posts-list'>{this.renderPlaceholders()}</div>
    if (!this.props.user) return <div>No comments</div>
    return (
      <div className='comment-page'>
        <div>
          {this.renderComments()}
        </div>
        <button ref='button' onClick={this.onTopClick} className='pagination-button'>Top</button>
      </div>
    )
  }
}

function mapStateToProps ({users}) {
  return {
    user: users.user,
    loading: users.loading
  }
}

export default connect(mapStateToProps, {fetchUser, clearUser})(Comments)
