import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router'
import PostItem from './post_item'
import {FormattedRelative} from 'react-intl'

class Comment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: '',
      displayChild: true,
      showHide: '[-]'
    }
    this.handleShowHideClick = this.handleShowHideClick.bind(this)
  }

  fetchComment (id) {
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => {
      this.setState({comment: res.data})
    })
  }

  componentWillMount () {
    this.fetchComment(this.props.id)
  }

  handleShowHideClick (e) {
    if (this.state.displayChild === true) this.setState({displayChild: false, showHide: '[+]'})
    if (this.state.displayChild === false) this.setState({displayChild: true, showHide: '[-]'})
  }

  renderChildren () {
    if (!this.state.comment.kids || this.props.type === 'non-comment') return
    return this.state.comment.kids.map(kid => {
      return (
        <div>
          <Comment key={kid} id={kid} />
        </div>
      )
    })
  }

  render () {
    if (!this.state.comment.text) return <div />
    const Dummy = document.createElement('div')
    Dummy.innerHTML = this.state.comment.text
    if (this.props.type === 'non-comment') {
      return <PostItem key={this.state.comment.id} score={this.state.comment.score} id={this.state.comment.id} title={this.state.comment.title} by={this.state.comment.by} time={this.state.comment.time} />
    }
    const utcSeconds = this.state.comment.time
    const date = new Date(0)
    date.setUTCSeconds(utcSeconds)
    if (this.state.displayChild === false) {
      return (
        <div className='comment' key={this.state.comment.id}>
          <div className='comment-header'>
            <div><a href={this.state.comment.url}>{this.state.comment.title}</a></div>
            <div className='comment-sub-header'>
              <Link className='comment-sub-header-user' to={`/user/${this.state.comment.by}`}>{this.state.comment.by} </Link>
              <FormattedRelative value={date} />
              <div onClick={this.handleShowHideClick} className='show-hide'>{this.state.showHide}</div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className='comment' key={this.state.comment.id}>
        <div className='comment-header'>
          <div><a href={this.state.comment.url}>{this.state.comment.title}</a></div>
          <div className='comment-sub-header'>
            <Link className='comment-sub-header-user' to={`/user/${this.state.comment.by}`}>{this.state.comment.by} </Link>
            <FormattedRelative value={date} />
            <div onClick={this.handleShowHideClick} className='show-hide'>{this.state.showHide}</div>
          </div>
        </div>
        <div>{Dummy.innerText}</div>
        <div>{this.renderChildren()}</div>
      </div>
    )
  }
}

function mapStateToProps ({comment}) {
  return {comment}
}

export default connect(mapStateToProps)(Comment)
