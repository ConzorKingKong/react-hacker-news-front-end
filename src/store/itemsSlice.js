import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiQueue } from '../utils/apiQueue'

const ROOT_URL = 'https://hacker-news.firebaseio.com/v0/'
const ALGOLIA_URL = 'https://hn.algolia.com/api/v1/'

// Async thunks
export const fetchStories = createAsyncThunk(
  'items/fetchStories',
  async (type) => {
    const response = await axios.get(`${ROOT_URL}${type}.json`)
    return response.data
  }
)

export const fetchItem = createAsyncThunk(
  'items/fetchItem',
  async (id) => {
    const response = await axios.get(`${ALGOLIA_URL}items/${id}`)
    return response.data
  }
)

export const fetchAlgoliaItem = createAsyncThunk(
  'items/fetchAlgoliaItem',
  async (id) => {
    const response = await axios.get(`${ALGOLIA_URL}items/${id}`)
    return response.data
  }
)

export const searchItems = createAsyncThunk(
  'items/search',
  async ({ term, by, type }) => {
    const response = await axios.get(
      `${ALGOLIA_URL}${by}?query=${term}&tags=${type}&hitsPerPage=99999999`
    )
    return response.data
  }
)

// Fetch individual item for list display (using queue)
export const fetchListItem = createAsyncThunk(
  'items/fetchListItem',
  async (id, { getState }) => {
    const state = getState()
    // Check if item is already cached
    if (state.items.itemsCache[id]) {
      return { id, data: state.items.itemsCache[id], cached: true }
    }
    
    const data = await apiQueue.request(`${ROOT_URL}item/${id}.json`)
    return { id, data, cached: false }
  }
)

// Slice
const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: null,
    item: null,
    comments: null,
    loading: false,
    error: null,
    itemsCache: {} // Cache for individual items
  },
  reducers: {
    clearStories: (state) => {
      state.items = null
    },
    clearItem: (state) => {
      state.item = null
      state.comments = null
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Stories
      .addCase(fetchStories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Fetch Item
      .addCase(fetchItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.loading = false
        state.item = action.payload
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Fetch Algolia Item
      .addCase(fetchAlgoliaItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAlgoliaItem.fulfilled, (state, action) => {
        state.loading = false
        state.item = action.payload
      })
      .addCase(fetchAlgoliaItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Search
      .addCase(searchItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Fetch List Item
      .addCase(fetchListItem.fulfilled, (state, action) => {
        if (!action.payload.cached) {
          state.itemsCache[action.payload.id] = action.payload.data
        }
      })
  }
})

export const { clearStories, clearItem } = itemsSlice.actions
export default itemsSlice.reducer