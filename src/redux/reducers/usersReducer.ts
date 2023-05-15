import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import axios, { AxiosError } from "axios";

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

 export const fetchAllUsers = createAsyncThunk(
    "fetchAllUsers",
    async () => {
        try {
            const result = await axios.get<User[]>("https://api.escuelajs.co/api/v1/users")
            return result.data
        } catch (e) {
            const error = e as AxiosError
            if(error.request) {
                console.log("error in request: ", error.request)
            } else {
                console.log(error.response?.data)
            }
        }
    }
    
)

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<User>) => {
            state.push(action.payload)
        },
        updateUserReducer: (state, action: PayloadAction<User[]>) => {
            return action.payload
        }
    },
    extraReducers: (build) => {
        build.addCase(fetchAllUsers.fulfilled, (state, action) => {
            if(action.payload) {
                return action.payload
            }
        })
    }
})

const usersReducer = usersSlice.reducer
export const
    {
        createUser,
        updateUserReducer
        
    } = usersSlice.actions
export default usersReducer 