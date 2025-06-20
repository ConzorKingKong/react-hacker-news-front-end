import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './itemsSlice'
import usersReducer from './usersSlice'

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    users: usersReducer
  }
})

export default store