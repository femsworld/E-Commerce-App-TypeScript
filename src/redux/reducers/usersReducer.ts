import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

const initialState: User[] = [
    {
        id: 1,
        name: "Femi",
        email: "femi@mail.com",
        avatar: "",
        password: "femi",
        role: "admin"
    }
]

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.push(action.payload)
        }
    }
    
})

const usersReducer = usersSlice.reducer
export const
    {
        createUser,
        
    } = usersSlice.actions
export default usersReducer