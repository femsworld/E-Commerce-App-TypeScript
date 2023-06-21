import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";

import { User } from "../../types/User";
import { UserProfile } from "../../types/UserProfile";
import { UserUpdate } from "../../types/UserUpdate";
import { NewUser } from "../../types/NewUser";

interface UserReducer {
  users: User[];
  currentUser?: User;
  newUser: NewUser;
  loading: boolean;
  error: string;
}

const initialState: UserReducer = {
  users: [],
  loading: false,
  error: "",
  newUser: {
    name: "",
    email: "",
    password: "",
    avatar: "",
  },
  currentUser: {
    id: -1,
    name: "",
    email: "",
    role: "customer",
    password: "",
    avatar: "",
  },
};

interface FetchQuery {
  page: number;
  per_page: number;
}

interface RootState {
  users: UserReducer;
  // Other reducers...
}

interface thunkAPI {
  username: string;
  password: string;
}

interface TokenResponse {
  token: string;
}
interface DecodedToken {
  name: string;
}

export const setCurrentUser = createAction<User>("users/setCurrentUser");

export const fetchAllUsers = createAsyncThunk(
  "fetchAllUsers",
  async ({ page, per_page }: FetchQuery) => {
    console.log("All user", page, per_page)
    try {
      const result = await axios.get<User[]>(
        `https://api.escuelajs.co/api/v1/users?page=${page}&per_page=${per_page}`
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const EditMeUser = createAsyncThunk(
  "EditMeUser",
  async ({ id, email, password, name, role, avatar }: UserProfile) => {
    console.log("before update: ",id, name)
    try {
      const result = await axios.put<User>(
        `https://api.escuelajs.co/api/v1/users/${id}`,
        { email: email, password: password, name: name, role: role, avatar: avatar }
      );
      console.log("Updated user profile", result)
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const createOneUser = createAsyncThunk(
  "createOneUser", 
  async({email, password, name, avatar}: NewUser) => {
  try {
    const result = await axios.post<NewUser>(`https://api.escuelajs.co/api/v1/users/`, { email: email, password: password, name: name, avatar: avatar })
    return result.data
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
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.users = action.payload;
        }
      })
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = "Cannot fetch data";
      })
      .addCase(EditMeUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.currentUser = action.payload;
        }
      })
      .addCase(EditMeUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditMeUser.rejected, (state) => {
        state.error = "User cannot be update at the moment, try again later.";
      })
      .addCase(createOneUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.newUser = action.payload
        }
      })
      .addCase(createOneUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOneUser.rejected, (state) => {
        state.error = "User cannot be update at the moment, try again later.";
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
