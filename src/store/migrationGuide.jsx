/**
 * Migration Guide: Old Redux to Redux Toolkit
 * 
 * This file provides a mapping of old action creators to new Redux Toolkit actions
 * to help with updating components.
 */

// OLD ACTION IMPORTS:
// import { fetchStories, clearStories, fetchItem, item, user, clearItem, fetchUser, clearUser, search } from '../actions'

// NEW IMPORTS:
// import { fetchStories, clearStories, fetchItem, clearItem } from '../store/itemsSlice'
// import { fetchUser, clearUser } from '../store/usersSlice'
// import { fetchAlgoliaItem, searchItems } from '../store/itemsSlice'
// import { fetchAlgoliaUser } from '../store/usersSlice'

/**
 * ITEMS/STORIES ACTIONS MAPPING:
 * 
 * OLD: dispatch(fetchStories(type))
 * NEW: dispatch(fetchStories(type))
 * 
 * OLD: dispatch(clearStories())
 * NEW: dispatch(clearStories())
 * 
 * OLD: dispatch(fetchItem(id))
 * NEW: dispatch(fetchItem(id))
 * 
 * OLD: dispatch(item(id))  // Algolia item
 * NEW: dispatch(fetchAlgoliaItem(id))
 * 
 * OLD: dispatch(clearItem())
 * NEW: dispatch(clearItem())
 * 
 * OLD: dispatch(search(term, by, type))
 * NEW: dispatch(searchItems({ term, by, type }))
 */

/**
 * USER ACTIONS MAPPING:
 * 
 * OLD: dispatch(fetchUser(id))
 * NEW: dispatch(fetchUser(id))
 * 
 * OLD: dispatch(user(id))  // Algolia user
 * NEW: dispatch(fetchAlgoliaUser(id))
 * 
 * OLD: dispatch(clearUser())
 * NEW: dispatch(clearUser())
 */

/**
 * STATE SHAPE:
 * The state shape remains the same:
 * - state.items.items - array of story IDs or search results
 * - state.items.item - single item object
 * - state.items.comments - array of comment objects
 * - state.users.user - user object
 * - state.users.loading - loading state for user
 * 
 * NEW ADDITIONS:
 * - state.items.loading - loading state for items
 * - state.items.error - error state for items
 * - state.users.error - error state for users
 */

/**
 * COMPONENT UPDATE EXAMPLE:
 * 
 * OLD:
 * import { fetchStories } from '../../actions'
 * 
 * componentDidMount() {
 *   this.props.fetchStories('topstories')
 * }
 * 
 * export default connect(mapStateToProps, { fetchStories })(Component)
 * 
 * NEW:
 * import { fetchStories } from '../../store/itemsSlice'
 * 
 * componentDidMount() {
 *   this.props.fetchStories('topstories')
 * }
 * 
 * export default connect(mapStateToProps, { fetchStories })(Component)
 */

/**
 * ASYNC ACTION HANDLING:
 * Redux Toolkit's createAsyncThunk automatically handles:
 * - pending state (sets loading: true)
 * - fulfilled state (sets data and loading: false)
 * - rejected state (sets error and loading: false)
 * 
 * You can now check loading states in components:
 * if (this.props.loading) return <Spinner />
 */

export default {}