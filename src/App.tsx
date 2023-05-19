import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { GlobalState } from './redux/store'
import useAppSelector from './hooks/useAppSelector'
import { createUser, 
  emptyUserReducer, 
  fetchAllUsers, 
  sortByEmail, 
  updateOneUser, 
  updateUserReducer } from './redux/reducers/usersReducer'
import useAppDispatch from './hooks/useAppDispatch'
import axios from 'axios'
import { User } from './types/User'
import { IconButton } from '@mui/material'
import { addOneFav, removeFromFav } from './redux/reducers/favReducer'
import Home from './components/layout/Home'
import { fetchAllProducts } from './redux/reducers/productsReducer'
import { Product } from './types/Product'


const getFilteredList = (users: User[], search: string) => {
  return users.filter(user => user.name.toLowerCase().includes(search.toLocaleLowerCase()))
}

// const getFilteredProductList = (products: Product[], search: string) => {
//   return products.filter(product => product.title.toLowerCase().includes(search.toLocaleLowerCase()))
// }

const App = () => {
  const [sort, setSort] = useState<"asc" | "desc">("asc")
  const [search, setSearch] = useState("")
  const {users, loading, error} = useAppSelector(state => state.usersReducer)
  const filterUsers = getFilteredList(users, search)
  const favIds = useAppSelector(state => state.favReducer)
  const favList = users.filter(user => favIds.includes(user.id))
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
  }

  useEffect(() => {
    dispatch(fetchAllUsers({ page: 1, per_page: 10 }))
  }, [])
  
  const deleteAllUsers = () => {
    dispatch(emptyUserReducer())
  }
  
  const updateUser = () => {
    dispatch(updateOneUser({
      id: 1,
        update: {
        email: "femi@mail.com",
        password: "femi",
        role: "customer",
        name: "femi",
        avatar: ""
      }
    }))
  }
  
  const sortByEmailDynamic = () => {
    dispatch(sortByEmail(sort))
    setSort(sort === "asc" ? "desc" : "asc")
  }
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    }

    const toggleFav = (id: number) =>{
      if (favIds.includes(id)){
        dispatch(removeFromFav(id))
      } else {
        dispatch(addOneFav(id))
      }
      
    }

  return (
      <div>
        <Home />
        <button onClick={addUser}>Create new user</button>
          <button onClick={deleteAllUsers}>Empty User List</button>
          <button onClick={updateUser}>Update One user</button>
          <button onClick={sortByEmailDynamic}>Sort By Email</button>
          <input
        type="text"
        name="search"
        value={search}
        onChange={onSearchChange} //create useDebounce custom hook ?
      />
        {/* {filterUsers.map(user =>
            <div>
              <p key={user.id}>{user.name}: {user.email}</p>
              <IconButton
              onClick={()=>toggleFav(user.id)}
              color= {favIds.includes(user.id)?"success": "info"} >
                <FavoriteIcon/>
              </IconButton>
            </div>
            )} */}
      {/* <div>
        <h3>Favourite List</h3>
        {favList.map(
          fav => (
            <p> {fav.name} </p>
          ))}
      </div> */}
      Product List
      
      
          
      </div>
  )
}

export default App

