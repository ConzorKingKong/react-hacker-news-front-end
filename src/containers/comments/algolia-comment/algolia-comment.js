import '../comment/comment.styl'

import React, {Component} from 'react'
import {Link} from 'react-router'
import {FormattedRelative} from 'react-intl'
import autobind from 'autobind-decorator'

export default class AlgoliaComment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      displayChild: true,
      showHide: '[-]'
    }
  }

  @autobind
  handleShowHideClick (e) {
    if (this.state.displayChild === true) this.setState({displayChild: false, showHide: '[+]'})
    if (this.state.displayChild === false) this.setState({displayChild: true, showHide: '[-]'})
  }

  renderChildren () {
    if (!this.props.children) return
    return this.props.children.map(child => {
      return (
        <div>
          <AlgoliaComment children={child.children} author={child.author} url={child.url} time={child.created_at_i} text={child.text} link={child.parent_id} key={child.id} id={child.id} />
        </div>
      )
    })
  }

  render () {
    if (!this.props.text) return null
    const utcSeconds = this.props.time
    const date = new Date(0)
    date.setUTCSeconds(utcSeconds)
    if (this.state.displayChild === false) {
      return (
        <div className='comment' key={this.props.id}>
          <div className='comment-header'>
            <div><a href={this.props.url}>{this.props.title}</a></div>
            <div className='comment-sub-header'>
              <div onClick={this.handleShowHideClick} className='show-hide'>{this.state.showHide}</div>
              <Link className='comment-sub-header-user' to={`/user/${this.props.author}`}>{this.props.author} </Link>
              <FormattedRelative value={date} />
            </div>
          </div>
        </div>
      )
    }
    if (!this.props.link) {
      return (
        <div className='comment' id={this.props.id} key={this.props.id}>
          <div className='comment-header'>
            <div><a href={this.props.url}>{this.props.title}</a></div>
            <div className='comment-sub-header'>
              <div onClick={this.handleShowHideClick} className='show-hide'>{this.state.showHide}</div>
              <Link className='comment-sub-header-user' to={`/user/${this.props.author}`}>{this.props.author} </Link>
              <FormattedRelative value={date} />
            </div>
          </div>
          <p dangerouslySetInnerHTML={{__html: this.props.text}} />
          <div>{this.renderChildren()}</div>
        </div>
      )
    }
    return (
      <div className='comment' id={this.props.id} key={this.props.id}>
        <div className='comment-header'>
          <div><a href={this.props.url}>{this.props.title}</a></div>
          <div className='comment-sub-header'>
            <div onClick={this.handleShowHideClick} className='show-hide'>{this.state.showHide}</div>
            <Link className='comment-sub-header-user' to={`/user/${this.props.author}`}>{this.props.author} </Link>
            <FormattedRelative value={date} />
            <a href={`#${this.props.link}`}>Parent</a>
          </div>
        </div>
        <p dangerouslySetInnerHTML={{__html: this.props.text}} />
        <div>{this.renderChildren()}</div>
      </div>
    )
  }
}
