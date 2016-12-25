import './comment.styl'

import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import {FormattedRelative} from 'react-intl'
import autobind from 'autobind-decorator'

export default class Comment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: '',
      displayChild: true,
      showHide: '[-]'
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

  @autobind
  handleShowHideClick (e) {
    if (this.state.displayChild === true) {
      this.state.comment.kids ? this.setState({displayChild: false, showHide: `[+${this.state.comment.kids.length}]`}) : this.setState({displayChild: false, showHide: `[+]`})
    }
    if (this.state.displayChild === false) this.setState({displayChild: true, showHide: '[-]'})
  }

  renderChildren () {
    if (!this.state.comment.kids) return
    return this.state.comment.kids.map(kid => {
      return (
        <div>
          <Comment link={this.state.comment.id} key={kid} id={kid} />
        </div>
      )
    })
  }

  render () {
    if (!this.state.comment.text) return null
    if (this.state.comment.type !== 'comment') return null
    const utcSeconds = this.state.comment.time
    const date = new Date(0)
    date.setUTCSeconds(utcSeconds)
    if (this.state.displayChild === false) {
      return (
        <div className='comment' key={this.state.comment.id}>
          <div className='comment-header'>
            <div><a href={this.state.comment.url}>{this.state.comment.title}</a></div>
            <div className='comment-sub-header'>
              <div onClick={this.handleShowHideClick} className='show-hide'>{this.state.showHide}</div>
              <Link className='comment-sub-header-user' to={`/user/${this.state.comment.by}`}>{this.state.comment.by} </Link>
              <FormattedRelative value={date} />
              <a className='parent' href={`#${this.props.link}`}>Parent</a>
            </div>
          </div>
        </div>
      )
    }
    if (!this.props.link) {
      return (
        <div className='comment' id={this.state.comment.id} key={this.state.comment.id}>
          <div className='comment-header'>
            <div><a href={this.state.comment.url}>{this.state.comment.title}</a></div>
            <div className='comment-sub-header'>
              <div onClick={this.handleShowHideClick} className='show-hide'>{this.state.showHide}</div>
              <Link className='comment-sub-header-user' to={`/user/${this.state.comment.by}`}>{this.state.comment.by} </Link>
              <FormattedRelative value={date} />
            </div>
          </div>
          <p dangerouslySetInnerHTML={{__html: this.state.comment.text}} />
          <div>{this.renderChildren()}</div>
        </div>
      )
    }
    return (
      <div className='comment' id={this.state.comment.id} key={this.state.comment.id}>
        <div className='comment-header'>
          <div><a href={this.state.comment.url}>{this.state.comment.title}</a></div>
          <div className='comment-sub-header'>
            <div onClick={this.handleShowHideClick} className='show-hide'>{this.state.showHide}</div>
            <Link className='comment-sub-header-user' to={`/user/${this.state.comment.by}`}>{this.state.comment.by} </Link>
            <FormattedRelative value={date} />
            <a className='parent' href={`#${this.props.link}`}>Parent</a>
          </div>
        </div>
        <p dangerouslySetInnerHTML={{__html: this.state.comment.text}} />
        <div>{this.renderChildren()}</div>
      </div>
    )
  }
}
