import axios from 'axios'
import async from 'async'

const ROOT_URL = 'https://hacker-news.firebaseio.com/v0/'

export const STORIES = 'STORIES'
export const CLEAR_STORIES = 'CLEAR_STORIES'
export const ITEM = 'ITEM'
export const CLEAR_ITEM = 'CLEAR_ITEM'
export const USER = 'USER'
export const CLEAR_USER = 'CLEAR_USER'

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
          console.log(err)
        }
        dispatch({type: ITEM, comments: results, payload: item})
      })
    })
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
