import axios from 'axios'
import async from 'async'

// () ${}

const ROOT_URL = 'https://hacker-news.firebaseio.com/v0/'

export const NEW_STORIES = 'NEW_STORIES'
export const ITEM = 'ITEM'
export const USER = 'USER'
export const COMMENTS = 'COMMENTS'

export function fetchNewStories() {
  return dispatch => {
    axios.get(`${ROOT_URL}newstories.json`).then(({data}) => {
      async.map(data, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => done(null, data))
      }, (err, results) => dispatch({type: NEW_STORIES, payload: results}))
    })
  }
}

export function fetchTopStories() {
  return dispatch => {
    axios.get(`${ROOT_URL}topstories.json`).then(({data}) => {
      async.map(data, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => done(null, data))
      }, (err, results) => dispatch({type: NEW_STORIES, payload: results}))
    })
  }
}

export function fetchShowStories() {
  return dispatch => {
    axios.get(`${ROOT_URL}showstories.json`).then(({data}) => {
      async.map(data, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => done(null, data))
      }, (err, results) => dispatch({type: NEW_STORIES, payload: results}))
    })
  }
}

export function fetchAskStories() {
  return dispatch => {
    axios.get(`${ROOT_URL}askstories.json`).then(({data}) => {
      async.map(data, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => done(null, data))
      }, (err, results) => dispatch({type: NEW_STORIES, payload: results}))
    })
  }
}

export function fetchJobStories() {
  return dispatch => {
    axios.get(`${ROOT_URL}jobstories.json`).then(({data}) => {
      async.map(data, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => done(null, data))
      }, (err, results) => dispatch({type: NEW_STORIES, payload: results}))
    })
  }
}

export function fetchItem(id) {
  return dispatch => {
    axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => {
      const item = data
      async.map(data.kids, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => {
          done(null, data)
        })
      }, (err, results) => {
        dispatch({type: ITEM, comments: results, payload: item})
      })
    })}

}

export function fetchUser(id) {
  return dispatch => {
    axios.get(`${ROOT_URL}user/${id}.json`).then(({data}) => {
      const user = data
      async.map(data.submitted, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => done(null, data))
      }, (err, results) => {
        dispatch({type: USER, payload: user, comments: results})
      })
    })}
}