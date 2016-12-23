import React, {Component} from 'react'
import {connect} from 'react-redux'
import {search} from '../actions/index'
import autobind from 'autobind-decorator'
import {browserHistory} from 'react-router'

class Searchbar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      term: ''
    }
  }

  @autobind
  handleInputChange (event) {
    this.setState({term: event.target.value})
  }

  @autobind
  handleSubmitForm (event) {
    event.preventDefault()
    this.props.search(this.state.term)
    browserHistory.push('/searchResults')
  }

  render () {
    return (
      <div className='searchbar-wrapper'>
        <form onSubmit={this.handleSubmitForm}>
          <input value={this.state.term} onChange={this.handleInputChange} type='text' />
          <button type='submit'>Search</button>
        </form>
      </div>
    )
  }
}

export default connect(null, {search})(Searchbar)
