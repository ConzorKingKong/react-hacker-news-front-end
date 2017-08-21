import axios from 'axios'
import async from 'async'

const ROOT_URL = 'https://hacker-news.firebaseio.com/v0/'
const ALGORIA_URL = 'https://hn.algolia.com/api/v1/'

export const STORIES = 'STORIES'
export const CLEAR_STORIES = 'CLEAR_STORIES'
export const ITEM = 'ITEM'
export const CLEAR_ITEM = 'CLEAR_ITEM'
export const USER = 'USER'
export const CLEAR_USER = 'CLEAR_USER'
export const SEARCH = 'SEARCH'
export const ALGOLIA_ITEM = 'ALGOLIA_ITEM'
export const ALGOLIA_USER = 'ALGOLIA_USER'

export function fetchStories (type) {
  const request = axios.get(`${ROOT_URL}${type}.json`)

  return {
    type: STORIES,
    payload: request
  }
}

export function clearStories () {
  return {
    type: CLEAR_STORIES,
    payload: null
  }
}

export function fetchItem (id) {
  return dispatch => {
    axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => {
      const item = data
      async.map(data.kids, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => {
          done(null, data)
        })
      }, (err, results) => {
        if (err) {
          // handle error
          console.log(err)
        }
        dispatch({type: ITEM, comments: results, payload: item})
      })
    })
  }
}

export function item (id) {
  const request = axios.get(`https://hn.algolia.com/api/v1/items/${id}`)

  return {
    type: ALGOLIA_ITEM,
    payload: request
  }
}

export function user (id) {
  const request = axios.get(`https://hn.algolia.com/api/v1/users/${id}`)

  return {
    type: ALGOLIA_USER,
    payload: request
  }
}

export function clearItem () {
  return {
    type: CLEAR_ITEM,
    payload: null
  }
}

export function fetchUser (id) {
  const request = axios.get(`${ROOT_URL}user/${id}.json`)

  return {
    type: USER,
    payload: request
  }
}

export function clearUser () {
  return {
    type: CLEAR_USER,
    payload: null
  }
}

export function search (term, by, type) {
  const request = axios.get(`${ALGORIA_URL}${by}?query=${term}&tags=${type}&hitsPerPage=99999999`)

  return {
    type: SEARCH,
    payload: request
  }
}
