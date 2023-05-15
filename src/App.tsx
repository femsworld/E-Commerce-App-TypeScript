import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GlobalState } from './redux/store'
import useAppSelector from './hooks/useAppSelector'
import { createUser, fetchAllUsers, updateUserReducer } from './redux/reducers/usersReducer'
import useAppDispatch from './hooks/useAppDispatch'
import axios from 'axios'

const App = () => {
  const users = useAppSelector(state => state.usersReducer)
  console.log(users)
  const dispatch = useAppDispatch()
  const addUser = () => {
    dispatch(createUser(
      {
        id: 2,
        email: "",
        password: "",
        role: "admin",
        name: "Tom",
        avatar: "string",
    }))
    // console.log("This is a new user: ", createUser({}))
  }

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  return (
      <div>
          <button onClick={addUser}>Create new user</button>
      </div>
  )
}

export default App