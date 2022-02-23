import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialState = {
  user: { username: null, password: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = false;
    },
    [authOperations.logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.logOut.fulfilled](state, action) {
      state.user = { username: null, password: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperations.fetchCarrentUser.pending](state) {
      state.isRefreshing = true;
    },
    [authOperations.fetchCarrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    [authOperations.fetchCarrentUser.rejected](state) {
      state.isRefreshing = false;
    },
  },
});

export default authSlice.reducer;
