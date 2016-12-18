import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {fetchItem, clearItem} from '../actions/index'
import Comment from './comment'
import {FormattedRelative} from 'react-intl'
import ItemPlaceholder from '../containers/item_placeholder'

class Item extends Component {
  componentWillMount () {
    this.props.fetchItem(this.props.params.id)
  }

  componentWillUnmount () {
    this.props.clearItem()
  }

  renderComments () {
    return this.props.comments.map(comment => {
      return (
        <Comment key={comment.id} id={comment.id} />
      )
    })
  }

  render () {
    if (!this.props.item) return <ItemPlaceholder />
    const {url, title, score, by, text, time} = this.props.item
    const date = new Date(0)
    date.setUTCSeconds(time)
    return (
      <div className='item'>
        <a className='item-title' href={url}>{title}</a>
        <div className='item-subtitle'>
          <div className='item-subtitle-user-info' >{score} Points by <Link to={`/user/${by}`}>{by}</Link></div>
          <FormattedRelative value={date} />
        </div>
        <p dangerouslySetInnerHTML={{__html: text}} />
        <div>{this.renderComments()}</div>
      </div>
    )
  }
}

function mapStateToProps ({items}) {
  return {
    item: items.item,
    comments: items.comments
  }
}

export default connect(mapStateToProps, {fetchItem, clearItem})(Item)
