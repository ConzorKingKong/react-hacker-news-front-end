import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchShowStories} from '../actions/index'
import {Link} from 'react-router'

class ShowStories extends Component {
  componentWillMount() {
    this.props.fetchShowStories()
  }

  renderPosts() {
      if (!this.props.items.items) {
        return <div>loading</div>
      } else {
        return (
          <Link to={`item/${this.props.items.items.id}`} className="link">
            <div>{this.props.items.items.title}</div>
            <div>{this.props.items.items.by}</div>
          </Link>
        )}
    }

  render() {
    return (
      <div className="links">
        {this.renderPosts()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {fetchShowStories})(ShowStories)