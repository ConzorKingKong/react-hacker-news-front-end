import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAskStories, clearStories} from '../actions/index'
import {Link} from 'react-router'
import LoadingCircle from './loadingCircle'
import PostItem from  './post_item'

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
          <PostItem key={id} id={id} by={by} title={title} />
        )
      })
    }

  render() {
    return (
      <div className="posts-list">
        {this.renderPosts()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {fetchAskStories, clearStories})(AskStories)