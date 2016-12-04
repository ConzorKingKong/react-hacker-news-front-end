import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {fetchItem} from '../actions/index'

class Item extends Component {
  componentWillMount() {
    this.props.fetchItem(this.props.params.id)
  }

  render() {
    if (!this.props.items.item) {
      return <div>loading</div>
    } else {
      console.log(this.props.items.item)
      return (
        <div>
          <a className="item-title" href={this.props.items.item.url}>{this.props.items.item.title}</a>
          <div className="test">
            <div>{this.props.items.item.score} Points by <Link to={`user/${this.props.items.item.by}`}>{this.props.items.item.by}</Link></div>
            <div>Web</div>
          </div>
          <p>{this.props.items.item.text}</p>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {fetchItem})(Item)