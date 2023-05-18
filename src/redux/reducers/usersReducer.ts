import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import axios, { AxiosError } from "axios";
import { UserUpdate } from "../../types/UserUpdate";

interface UserReducer {
  users: User[]
  currentUser?: User
  loading: boolean
  error: string
}

const initialState: UserReducer = {
  users: [],
  loading: false,
  error: ""
}

interface FetchQuery {
  page: number
  per_page: number
}

export const fetchAllUsers = createAsyncThunk(
  "fetchAllUsers",
  async ({
      page, per_page
  }: FetchQuery) => {
      try {
          const result = await axios.get<User[]>(`https://api.escuelajs.co/api/v1/users?page=${page}&per_page=${per_page}`)
          return result.data // returned result would be inside action.payload
      } catch (e) {
          const error = e as AxiosError
          return error
      }
  }
)
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUserReducer: (state, action: PayloadAction<User[]>) => {},
    emptyUserReducer: (state) => {
      state.users = [];
    },
    updateOneUser: (state, action: PayloadAction<UserUpdate>) => {
      const users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return { ...user, ...action.payload.update };
        }
        return user;
      });
      return {
        ...state,
        users,
      };
    },
    sortByEmail: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.users.sort((a, b) => a.email.localeCompare(b.email));
      } else {
        state.users.sort((a, b) => b.email.localeCompare(a.email));
      }
    },
  },
  extraReducers: (build) => {
    build
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
      if(action.payload instanceof AxiosError) {
        state.error = action.payload.message
      } else {
        state.users = action.payload
      }

        })
       .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true
    })
    .addCase(fetchAllUsers.rejected, (state, action) => {
      state.error = "Cannot fetch data"
    })
  },
});

const usersReducer = usersSlice.reducer;
export const {
  createUser,
  updateUserReducer,
  emptyUserReducer,
  updateOneUser,
  sortByEmail,
} = usersSlice.actions;
export default usersReducer;
