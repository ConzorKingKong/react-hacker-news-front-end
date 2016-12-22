import React, {Component} from 'react'
import {connect} from 'react-redux'
import {search} from '../actions/index'

class Searchbar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      term: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }

  handleInputChange (event) {
    this.setState({term: event.target.value})
  }

  handleSubmitForm (event) {
    event.preventDefault()
    this.props.search(this.state.term)
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
