import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {fetchItem, clearItem} from '../actions/index'
import Comment from './comment'
import {FormattedRelative} from 'react-intl'
import ItemPlaceholder from './item_placeholder'

class Item extends Component {
  componentWillMount () {
    this.props.fetchItem(this.props.params.id)
  }

  componentWillUnmount () {
    this.props.clearItem()
  }

  renderComments () {
    return this.props.items.comments.map(comment => {
      return (
        <Comment key={comment.id} id={comment.id} />
      )
    })
  }

  render () {
    if (!this.props.items.item) return <ItemPlaceholder />
    const {url, title, score, by, text, time} = this.props.items.item
    const Dummy = document.createElement('div')
    Dummy.innerHTML = text
    if (Dummy.innerText === 'undefined') Dummy.innerHTML = ' '
    const utcSeconds = time
    const date = new Date(0)
    date.setUTCSeconds(utcSeconds)
    return (
      <div className='item'>
        <a className='item-title' href={url}>{title}</a>
        <div className='item-subtitle'>
          <div className='item-subtitle-user-info' >{score} Points by <Link to={`/user/${by}`}>{by}</Link></div>
          <FormattedRelative value={date} />
        </div>
        <p>{Dummy.innerText}</p>
        <div>{this.renderComments()}</div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps, {fetchItem, clearItem})(Item)
