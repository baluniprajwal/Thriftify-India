import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true; // Set user as authenticated
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false; // Set user as unauthenticated
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
