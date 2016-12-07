import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchNewStories} from '../actions/index'
import {Link} from 'react-router'

class HomePage extends Component {
  componentWillMount() {
    this.props.fetchNewStories()
  }

  renderPosts() {
    if (!this.props.items.items) return <div>loading</div>
    return this.props.items.items.map(({id, title, by}) => {
      return (
        <Link key={id} to={`item/${id}`} className="link">
          <div>{title}</div>
          <div>{by}</div>
        </Link>
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

export default connect(mapStateToProps, {fetchNewStories})(HomePage)