import React, {Component} from 'react'
import {Link} from 'react-router'
import {FormattedRelative} from 'react-intl'
import StoryPlaceholder from '../containers/story_placeholder'
import axios from 'axios'

export default class PostItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: ''
    }
  }
  fetchComment (id) {
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => {
      this.setState({comment: res.data})
    })
  }

  componentWillMount () {
    this.fetchComment(this.props.id)
  }

  render () {
    if (!this.state.comment) return <StoryPlaceholder />
    if (this.state.comment.type === 'comment') return null
    const utcSeconds = this.state.comment.time
    const date = new Date(0)
    date.setUTCSeconds(utcSeconds)
    return (
      <div key={this.state.comment.id} className='posts-list-item'>
        <div className='posts-list-item-score'>{this.state.comment.score}</div>
        <Link className='posts-list-item-title' to={`item/${this.state.comment.id}`}>{this.state.comment.title}</Link>
        <div className='posts-list-item-by'>by</div>
        <Link className='posts-list-item-user' to={`user/${this.state.comment.by}`}>{this.state.comment.by}</Link>
        <div title={date}>
          <FormattedRelative value={date} />
        </div>
      </div>
    )
  }
}
