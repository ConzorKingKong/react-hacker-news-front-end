import axios from 'axios'
import async from 'async'

// () ${}

const ROOT_URL = 'https://hacker-news.firebaseio.com/v0/'

export const NEW_STORIES = 'NEW_STORIES'
export const CLEAR_STORIES = 'CLEAR_STORIES'
export const ITEM = 'ITEM'
export const CLEAR_ITEM = 'CLEAR_ITEM'
export const USER = 'USER'
export const USER_INFO = 'USER_INFO'
export const CLEAR_USER = 'CLEAR_USER'
export const COMMENT = 'COMMENT'

export function fetchNewStories () {
  return dispatch => {
    axios.get(`${ROOT_URL}newstories.json`).then(({data}) => {
      async.map(data, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => done(null, data))
      }, (err, results) => {
        if (err) {
          console.log(err)
        }
        dispatch({type: NEW_STORIES, payload: results})
      })
    })
  }
}

export function fetchTopStories () {
  return dispatch => {
    axios.get(`${ROOT_URL}topstories.json`).then(({data}) => {
      async.map(data, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => done(null, data))
      }, (err, results) => {
        if (err) {
          console.log(err)
        }
        dispatch({type: NEW_STORIES, payload: results})
      })
    })
  }
}

export function fetchShowStories () {
  return dispatch => {
    axios.get(`${ROOT_URL}showstories.json`).then(({data}) => {
      async.map(data, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => done(null, data))
      }, (err, results) => {
        if (err) {
          console.log(err)
        }
        dispatch({type: NEW_STORIES, payload: results})
      })
    })
  }
}

export function fetchAskStories () {
  return dispatch => {
    axios.get(`${ROOT_URL}askstories.json`).then(({data}) => {
      async.map(data, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => done(null, data))
      }, (err, results) => {
        if (err) {
          console.log(err)
        }
        dispatch({type: NEW_STORIES, payload: results})
      })
    })
  }
}

export function fetchJobStories () {
  return dispatch => {
    axios.get(`${ROOT_URL}jobstories.json`).then(({data}) => {
      async.map(data, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => done(null, data))
      }, (err, results) => {
        if (err) {
          console.log(err)
        }
        dispatch({type: NEW_STORIES, payload: results})
      })
    })
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

export function fetchUserInfo (id) {
  return dispatch => {
    axios.get(`${ROOT_URL}user/${id}.json`).then(({data}) => {
      const user = data
      async.map(data.submitted, (id, done) => {
        axios.get(`${ROOT_URL}item/${id}.json`).then(({data}) => done(null, data))
      }, (err, results) => {
        if (err) {
          console.log(err)
        }
        dispatch({type: USER_INFO, payload: user, comments: results})
      })
    })
  }
}

export function clearUser () {
  return {
    type: CLEAR_USER,
    payload: null
  }
}

export function fetchComment (id) {
  const request = axios.get(`${ROOT_URL}item/${id}.json`)

  return {
    type: COMMENT,
    payload: request
  }
}
