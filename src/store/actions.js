/**
 * Backward compatibility exports for old action imports
 * This file re-exports Redux Toolkit actions with the old names
 */

// Re-export from itemsSlice
export {
  fetchStories,
  clearStories,
  fetchItem,
  clearItem,
  fetchListItem,
  searchItems as search
} from './itemsSlice'

// Re-export from usersSlice
export {
  fetchUser,
  clearUser
} from './usersSlice'

// Re-export Algolia actions with old names
export { fetchAlgoliaItem as item } from './itemsSlice'
export { fetchAlgoliaUser as user } from './usersSlice'

// Note: The search action now requires an object parameter
// OLD: search(term, by, type)
// NEW: search({ term, by, type })