import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {fetchItem, clearItem} from '../actions/index'
import Comment from './comment'
import LoadingCircle from './loadingCircle'

class Item extends Component {
  componentWillMount() {
    this.props.fetchItem(this.props.params.id)
  }

  componentWillUnmount() {
    this.props.clearItem()
  }

  renderComments() {
    return this.props.items.comments.map(comment => {
      console.log("comments", comment)
      return (
        <Comment id={comment.id} />
      )
    })
  }

  render() {
    if (!this.props.items.item) return <LoadingCircle />
    const {url, title, score, by, text} = this.props.items.item
    return (
      <div>
        <a className="item-title" href={url}>{title}</a>
        <div className="test">
          <div>{score} Points by <Link to={`/user/${by}`}>{by}</Link></div>
          <div>Web</div>
        </div>
        <p>{text}</p>
        <div>{this.renderComments()}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {fetchItem, clearItem})(Item)