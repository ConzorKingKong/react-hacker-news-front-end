import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {fetchItem} from '../actions/index'

class Item extends Component {
  componentWillMount() {
    this.props.fetchItem(this.props.params.id)
  }

  renderComments() {
    return this.props.items.comments.map(comment => {
      console.log("comments", comment)
      return (
        <div key={comment.id}>
            <div>{comment.by}</div>
            <div>{comment.text}</div>
        </div>
      )
    })
  }

  render() {
    if (!this.props.items.item) return <div>loading</div>
    const {url, title, score, by, text} = this.props.items.item
    return (
      <div>
        <a className="item-title" href={url}>{title}</a>
        <div className="test">
          <div>{score} Points by <Link to={`user/${by}`}>{by}</Link></div>
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

export default connect(mapStateToProps, {fetchItem})(Item)