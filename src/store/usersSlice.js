import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const ROOT_URL = 'https://hacker-news.firebaseio.com/v0/'
const ALGOLIA_URL = 'https://hn.algolia.com/api/v1/'

// Async thunks
export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (id) => {
    const response = await axios.get(`${ROOT_URL}user/${id}.json`)
    return response.data
  }
)

export const fetchAlgoliaUser = createAsyncThunk(
  'users/fetchAlgoliaUser',
  async (id) => {
    const response = await axios.get(`${ALGOLIA_URL}users/${id}`)
    return response.data
  }
)

// Slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: {},
    loading: true,
    error: null
  },
  reducers: {
    clearUser: (state) => {
      state.user = {}
      state.loading = true
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Fetch Algolia User
      .addCase(fetchAlgoliaUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAlgoliaUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchAlgoliaUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { clearUser } = usersSlice.actions
export default usersSlice.reducer