import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchJobStories, fetchItems} from '../actions/index'
import {Link} from 'react-router'

class JobStories extends Component {
  componentWillMount() {
    this.props.fetchJobStories()
  }

  renderPosts() {
      if (!this.props.items.items) {
        console.log("props outside else", this.props)
        return <div>loading</div>
      } else {
        console.log("this props items itmes", this.props.items.items)
        this.props.fetchItems(this.props.items.items)
        console.log("props in else", this.props)
        return (
          <Link to={`item/${this.props.items.items.id}`} className="link">
            <div>{this.props.items.items.title}</div>
            <div>{this.props.items.items.by}</div>
          </Link>
        )
      }
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

export default connect(mapStateToProps, {fetchJobStories, fetchItems})(JobStories)