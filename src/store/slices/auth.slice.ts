import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { removeToken, setToken } from "@/utils";

import { RootState } from "..";
import { AuthService, SignInInput } from "@/services/auth.service";

type User = {
  id: string;
  name: string;
  email: string;
};

interface AuthInitialState {
  loading: boolean;
  authenticated: boolean;
  user: User | null;
}

const initialState: AuthInitialState = {
  loading: false,
  authenticated: false,
  user: null,
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload: SignInInput, { rejectWithValue }) => {
    try {
      return await AuthService.signIn(payload);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      removeToken();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.authenticated = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const {
          user: { id, name, email },
          token,
        } = action.payload;
        state.loading = false;
        state.authenticated = true;

        state.user = {
          id,
          name,
          email,
        };
        setToken(JSON.stringify(token));
      })
      .addCase(signIn.rejected, (state) => {
        state.loading = false;
        state.authenticated = false;
      });
  },
});

export const selectUser = (state: RootState): User | null => state.auth.user;
export const selectAuthenticated = (state: RootState): boolean =>
  state.auth.authenticated;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
