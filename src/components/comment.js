import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router'

class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comment: ""
    }
  }

  fetchComment(id) {
  axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then( res => {
    console.log("res", res)
    this.setState({comment: res.data})
  })

  }

  componentWillMount() {
    this.fetchComment(this.props.id)
  }

  renderChildren() {
    if (!this.state.comment.kids || this.props.type === "non-comment") return
    return this.state.comment.kids.map(kid => {
      return (
        <div>
        <Comment id={kid} />
        </div>
      )
    })
  }

  render() {
    return (
      <div className="comment" key={this.state.comment.id}>
        <div className="comment-header">
          <div><a href={this.state.comment.url}>{this.state.comment.title}</a></div>
          <Link to={`/user/${this.state.comment.by}`}>{this.state.comment.by}</Link>
        </div>          
        <p>{this.state.comment.text}</p>
        <div>{this.renderChildren()}</div>
      </div>
    )
  }
}

function mapStateToProps({comment}) {
  return {comment}
}

export default connect(mapStateToProps)(Comment)