import axios from 'axios'
import async from 'async'

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
  // const request = axios.get(`${ROOT_KEY}askstories.json`).then(res => {
  //   res.data.map(id => {
  //     axios.get(`${ROOT_KEY}item/${id}.json`).then(res => {
  //       console.log("res res", res.data)
  //       return res.data
  //     })
  //   })
  // })
  // console.log("request", request)

  return {
    type: NEW_STORIES,
    payload: axios.get(`${ROOT_KEY}askstories.json`).then(res => {
    res.data.map(id => {
      console.log("id", id)
      axios.get(`${ROOT_KEY}item/${id}.json`).then(res => {
        console.log("res res", res.data)
        return res.data
      })
    })
  })
  }
}

// export function fetchJobStories() {
//   const request = axios.get(`${ROOT_KEY}jobstories.json`).then(res => {
//     const id = res.data[0]
//     return axios.get(`${ROOT_KEY}item/${id}.json`)
//   })
//   console.log("request", request)

//   return {
//     type: NEW_STORIES,
//     payload: request
//   }
// }

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

// export function fetchJobStories() {

//   return function (dispatch) {
//       return axios.get(`${ROOT_KEY}jobstories.json`).then((res) => {
//         console.log("first res",res.data)
//         res.data.map((id) => {
//           console.log("id", id)
//           axios.get(`${ROOT_KEY}item/${id}.json`).then((res) => {
//             console.log("sencond res", res.data)
//             return {
//               type: NEW_STORIES,
//               payload: res
//             }
//           })
//         })
//       })
//     }
//   }

export function fetchJobStories() {
  const request = axios.get(`${ROOT_KEY}jobstories.json`)

  return {
    type: NEW_STORIES,
    payload: request
  }
}

export function fetchItems(items) {
  console.log("items", items)

  return {
    type: ITEM,
    payload:  async.map(items, (item) => {
      console.log("item inside async", item)
      return axios.get(`${ROOT_KEY}item/${item}.json`)
    }, (err, result) => {
      console.log("error in async", err)
      console.log("result in async", result)
    })
  }
}

// make a state clear function that runs on header click

// items.map(item => {
//               return axios.get(`${ROOT_KEY}item/${item}.json`)
//             })