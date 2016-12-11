import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAskStories, clearStories} from '../actions/index'
import {Link} from 'react-router'
import LoadingCircle from './loadingCircle'

class AskStories extends Component {
  componentWillMount() {
    this.props.fetchAskStories()
  }

  componentWillUnmount() {
    this.props.clearStories()
  }

  renderPosts() {
      if (!this.props.items.items) return <LoadingCircle />
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

export default connect(mapStateToProps, {fetchAskStories, clearStories})(AskStories)