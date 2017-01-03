import React, {Component} from 'react'
import {connect} from 'react-redux'
import {search} from '../../actions/index'
import autobind from 'autobind-decorator'
import {browserHistory} from 'react-router'
import './searchbar.styl'

class Searchbar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      term: '',
      type: 'story',
      by: 'search'
    }
  }

  @autobind
  handleInputChange (event) {
    this.setState({term: event.target.value})
  }

  @autobind
  handleSubmitForm (event) {
    event.preventDefault()
    browserHistory.push(`/search?term=${this.state.term}&type=${this.state.type}&by=${this.state.by}`)
  }

  @autobind
  onTypeChange (event) {
    this.setState({type: event.target.value})
  }

  @autobind
  onByChange (event) {
    this.setState({by: event.target.value})
  }

  render () {
    return (
      <div className='searchbar-wrapper'>
        <form onSubmit={this.handleSubmitForm}>
          <input placeholder='Search' value={this.state.term} onChange={this.handleInputChange} type='text' />
          <div className='select-wrapper'>
          in
          <select value={this.state.type} onChange={this.onTypeChange}>
            <option value='story'>Stories</option>
            <option value='front_page'>Front Page</option>
            <option value='show_hn'>Show Hacker News</option>
            <option value='ask_hn'>Ask Hacker News</option>
            <option value='comment'>Comments</option>
            <option value='poll'>Polls</option>
          </select>
          by
          <select value={this.state.by} onChange={this.onByChange}>
            <option value='search'>Relevance</option>
            <option value='search_by_date'>Date</option>
          </select>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, {search})(Searchbar)
