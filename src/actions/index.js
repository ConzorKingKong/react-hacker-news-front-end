import axios from 'axios'

const ROOT_KEY = 'https://hacker-news.firebaseio.com/v0/'

export const NEW_STORIES = 'NEW_STORIES'
export const ITEM = 'ITEM'
export const USER = 'USER'

export function fetchNewStories() {
  const request = axios.get(`${ROOT_KEY}newstories.json`).then(res => {
    const id = res.data[0]
    return axios.get(`${ROOT_KEY}item/${id}.json`)
  })
  console.log("request", request)

  return {
    type: NEW_STORIES,
    payload: request
  }
}

export function fetchTopStories() {
  const request = axios.get(`${ROOT_KEY}topstories.json`).then(res => {
    const id = res.data[0]
    return axios.get(`${ROOT_KEY}item/${id}.json`)
  })
  console.log("request", request)

  return {
    type: NEW_STORIES,
    payload: request
  }
}

export function fetchShowStories() {
  const request = axios.get(`${ROOT_KEY}showstories.json`).then(res => {
    const id = res.data[0]
    return axios.get(`${ROOT_KEY}item/${id}.json`)
  })
  console.log("request", request)

  return {
    type: NEW_STORIES,
    payload: request
  }
}

export function fetchAskStories() {
  const request = axios.get(`${ROOT_KEY}askstories.json`).then(res => {
    const id = res.data[0]
    return axios.get(`${ROOT_KEY}item/${id}.json`)
  })
  console.log("request", request)

  return {
    type: NEW_STORIES,
    payload: request
  }
}

export function fetchJobStories() {
  const request = axios.get(`${ROOT_KEY}jobstories.json`).then(res => {
    const id = res.data[0]
    return axios.get(`${ROOT_KEY}item/${id}.json`)
  })
  console.log("request", request)

  return {
    type: NEW_STORIES,
    payload: request
  }
}

export function fetchItem(id) {
  const request = axios.get(`${ROOT_KEY}item/${id}.json`)

  return {
    type: ITEM,
    payload: request
  }
}

export function fetchUser(id) {
  const request = axios.get(`${ROOT_KEY}user/${id}.json`)

  return {
    type: USER,
    payload: request
  }
}