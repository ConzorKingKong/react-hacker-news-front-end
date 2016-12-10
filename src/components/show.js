import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchShowStories, clearStories} from '../actions/index'
import {Link} from 'react-router'

class ShowStories extends Component {
  componentWillMount() {
    this.props.fetchShowStories()
  }

  componentWillUnmount() {
    this.props.clearStories()
  }

  renderPosts() {
      if (!this.props.items.items) return <div>loading</div>
      return this.props.items.items.map(({id, title, by}) => {
        return (
          <div  key={id} className="link">
            <Link to={`item/${id}`}>{title}</Link>
            <Link to={`user/${by}`}>{by}</Link>
          </div>
        )
      })
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

export default connect(mapStateToProps, {fetchShowStories, clearStories})(ShowStories)