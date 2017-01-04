import './item.styl'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {fetchItem, clearItem, item} from '../../../actions/index'
import AlgoliaComment from '../../comments/algolia-comment/algolia-comment'
import {FormattedRelative} from 'react-intl'
import ItemPlaceholder from '../../../components/placeholders/item-placeholder/item-placeholder'

class Item extends Component {
  componentWillMount () {
    this.props.item(this.props.params.id)
  }

  componentWillUnmount () {
    this.props.clearItem()
  }

  renderComments () {
    return this.props.items.item.children.map(comment => {
      return (
        <AlgoliaComment children={comment.children} author={comment.author} url={comment.url} time={comment.created_at_i} text={comment.text} link={this.props.params.id} key={comment.id} id={comment.id} />
      )
    })
  }

  render () {
    if (!this.props.items.item) return <ItemPlaceholder />
    const {url, title, points, author, text, created_at_i} = this.props.items.item
    const date = new Date(0)
    date.setUTCSeconds(created_at_i)
    return (
      <div className='item' id={this.props.params.id}>
        <a className='item-title' href={url}>{title}</a>
        <div className='item-subtitle'>
          <div className='item-subtitle-user-info' >{points} Points by <Link to={`/user/${author}`}>{author}</Link></div>
          <FormattedRelative value={date} />
        </div>
        <div className='item-text' dangerouslySetInnerHTML={{__html: text}} />
        <div className='comment-list'>{this.renderComments()}</div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps, {fetchItem, clearItem, item})(Item)
