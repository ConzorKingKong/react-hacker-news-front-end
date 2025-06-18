import './user.css'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearUser, fetchUser } from '../../store/actions'
import { Link } from 'react-router-dom'
import UserPlaceholder from '../../components/placeholders/user-placeholder/user-placeholder.jsx'

const User = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { user, loading } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(fetchUser(id))
    
    return () => {
      dispatch(clearUser())
    }
  }, [dispatch, id])

  if (loading) return <UserPlaceholder />
  if (!user) return <div>This user does not exist</div>
  
  const { id: userId, karma } = user

  return (
    <div className='user'>
      <div className='user-header'>
        <h1>{userId}</h1>
        <h3>Karma: {karma}</h3>
        <Link to={`/stories/${userId}`}>Stories</Link>
        <Link to={`/comments/${userId}`}>Comments</Link>
      </div>
    </div>
  )
}

export default User